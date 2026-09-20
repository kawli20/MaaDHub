/**
 * Dynamic in-memory deobfuscation cipher for static deployment fallback.
 * Prevents plaintext credentials from appearing in client-side search or bundle inspection.
 */
const VAULT_SALT = "MDH_SECURE_VAULT_V2_2026_!#%";

export function deobfuscate(cipher: string, id: number): string {
  if (!cipher) return "";
  try {
    const raw = typeof atob !== "undefined"
      ? atob(cipher)
      : Buffer.from(cipher, "base64").toString("binary");
    const key = `${VAULT_SALT}_${id * 7919}`;
    let out = "";
    for (let i = 0; i < raw.length; i++) {
      out += String.fromCharCode(raw.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return out;
  } catch {
    return "";
  }
}

export function obfuscate(text: string, id: number): string {
  if (!text) return "";
  const key = `${VAULT_SALT}_${id * 7919}`;
  let out = "";
  for (let i = 0; i < text.length; i++) {
    out += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return typeof btoa !== "undefined"
    ? btoa(out)
    : Buffer.from(out, "binary").toString("base64");
}
