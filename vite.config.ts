import fs from "fs";
import path from "path";
const __dirname = import.meta.dirname;
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { CREDENTIALS_STORE } from "./src/server/credentialsStore";

const VAULT_SALT = "MDH_SECURE_VAULT_V2_2026_!#%";

function obfuscate(text: string, id: number): string {
  if (!text) return "";
  const key = `${VAULT_SALT}_${id * 7919}`;
  let out = "";
  for (let i = 0; i < text.length; i++) {
    out += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return Buffer.from(out, "binary").toString("base64");
}

function generateEncryptedVaultFile() {
  const entries: Record<number, { u: string; p: string }> = {};
  for (const [idStr, creds] of Object.entries(CREDENTIALS_STORE)) {
    const id = Number(idStr);
    entries[id] = {
      u: obfuscate(creds.username, id),
      p: obfuscate(creds.password, id),
    };
  }

  const fileContent = `/**
 * Auto-generated encrypted fallback credentials vault.
 * Ciphertext only - zero plaintext passwords or usernames in bundle.
 */
export const ENCRYPTED_VAULT: Record<number, { u: string; p: string }> = ${JSON.stringify(entries, null, 2)};
`;

  const targetPath = path.resolve(__dirname, "./src/lib/encryptedVaultData.ts");
  fs.writeFileSync(targetPath, fileContent, "utf-8");
}

// Generate vault immediately when config is evaluated
generateEncryptedVaultFile();

function devApiPlugin() {
  return {
    name: "dev-api-endpoints",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const parsedUrl = new URL(req.url, "http://localhost:3000");

        // 1. Dev Telegram Dispatcher
        if (parsedUrl.pathname === "/api/telegram" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => (body += chunk));
          req.on("end", async () => {
            try {
              const { text } = JSON.parse(body || "{}");
              const botToken = process.env.TELEGRAM_BOT_TOKEN || "8647581584:AAGvkz7tBGiuX94c-2OR-LZBKepi1equg8U";
              const channelId = process.env.TELEGRAM_CHANNEL_ID || "-1004445400084";

              const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                  chat_id: channelId,
                  text,
                  parse_mode: "HTML",
                }),
              });
              const tgData = await tgRes.json();
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(tgData));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err?.message }));
            }
          });
          return;
        }

        // 2. Dev Credentials Dispatcher
        if (parsedUrl.pathname === "/api/credentials" && req.method === "GET") {
          const id = parseInt(parsedUrl.searchParams.get("id") || "", 10);
          const creds = CREDENTIALS_STORE[id];
          res.setHeader("Content-Type", "application/json");
          if (!creds) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Not found" }));
            return;
          }
          res.end(JSON.stringify({ id, username: creds.username, password: creds.password }));
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devApiPlugin()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  envDir: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
