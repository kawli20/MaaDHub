import { CREDENTIALS_STORE } from "./server/credentialsStore";

interface Env {
  ASSETS: { fetch: (input: RequestInfo | URL) => Promise<Response> };
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHANNEL_ID?: string;
}

const FALLBACK_TELEGRAM_CHANNEL = "-1004445400084";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS headers for API requests
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Secure Telegram Proxy Endpoint
    // Keeps bot token securely on the server/worker and NEVER exposes it to client bundles
    if (url.pathname === "/api/telegram" && request.method === "POST") {
      try {
        const body = (await request.json()) as { text?: string };
        const text = body?.text;

        if (!text) {
          return new Response(JSON.stringify({ error: "Missing text payload" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const botToken = env.TELEGRAM_BOT_TOKEN || "8647581584:AAGvkz7tBGiuX94c-2OR-LZBKepi1equg8U";
        const channelId = env.TELEGRAM_CHANNEL_ID || FALLBACK_TELEGRAM_CHANNEL;

        const telegramRes = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              chat_id: channelId,
              text,
              parse_mode: "HTML",
            }),
          }
        );

        const tgData = await telegramRes.json();
        return new Response(JSON.stringify(tgData), {
          status: telegramRes.ok ? 200 : 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: "Failed to dispatch telegram message", details: err?.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // 2. Secure Credentials Retrieval Endpoint
    // Returns credentials on demand without shipping all accounts in the main client bundle
    if (url.pathname === "/api/credentials" && request.method === "GET") {
      const idParam = url.searchParams.get("id");
      const accountId = idParam ? parseInt(idParam, 10) : NaN;

      if (isNaN(accountId)) {
        return new Response(JSON.stringify({ error: "Invalid account ID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const creds = CREDENTIALS_STORE[accountId];
      if (!creds) {
        return new Response(JSON.stringify({ error: "Account credentials not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(
        JSON.stringify({
          id: accountId,
          username: creds.username,
          password: creds.password,
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Cache-Control": "private, max-age=60",
          },
        }
      );
    }

    // 3. Fallback to Cloudflare Worker Static Assets
    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status === 404) {
      const fallbackUrl = new URL("/index.html", request.url);
      return env.ASSETS.fetch(new Request(fallbackUrl, request));
    }

    return assetResponse;
  },
};
