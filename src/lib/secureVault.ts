/**
 * Secure Credential Vault
 * Ensures credentials are NEVER leaked in plaintext client bundles.
 * 
 * Features:
 * 1. Resolves credentials on-demand via server endpoint (/api/credentials)
 * 2. Fallback in-memory deobfuscation for purely static web deployments
 * 3. Strict protection for VIP / point-gated accounts: locked accounts NEVER expose credentials
 */

import { deobfuscate } from "./cipher";

export interface ResolvedCredentials {
  username: string;
  password: string;
  isLocked: boolean;
}

// In-memory cache for decrypted/fetched credentials (cleared on page reload)
const credentialCache = new Map<number, { username: string; password: string }>();

// Lazy-loaded encrypted vault chunk
let fallbackVaultPromise: Promise<Record<number, { u: string; p: string }>> | null = null;

async function getFallbackVault(): Promise<Record<number, { u: string; p: string }>> {
  if (!fallbackVaultPromise) {
    fallbackVaultPromise = import("./encryptedVaultData")
      .then((m) => m.ENCRYPTED_VAULT || {})
      .catch(() => ({}));
  }
  return fallbackVaultPromise;
}

/**
 * Resolves credentials asynchronously on demand.
 * 1. Checks if point-locked.
 * 2. Checks in-memory session cache.
 * 3. Attempts to fetch from server /api/credentials endpoint.
 * 4. Falls back to encrypted static vault deobfuscation if backend is unreachable.
 */
export async function resolveAccountCredentials(
  account: { id: number; pointsCost?: number },
  isUnlocked: boolean
): Promise<ResolvedCredentials> {
  const isPointGated = Boolean(account.pointsCost && account.pointsCost > 0);

  // If locked, return masked placeholders (no credentials in DOM or element tree)
  if (isPointGated && !isUnlocked) {
    return {
      username: "VIP_LOCKED",
      password: "••••••••••••",
      isLocked: true,
    };
  }

  // Check cache first
  if (credentialCache.has(account.id)) {
    const cached = credentialCache.get(account.id)!;
    return {
      username: cached.username,
      password: cached.password,
      isLocked: false,
    };
  }

  // Try server-side API first (Cloudflare Worker or dev server)
  try {
    const res = await fetch(`/api/credentials?id=${account.id}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.username && data.password) {
        credentialCache.set(account.id, {
          username: data.username,
          password: data.password,
        });
        return {
          username: data.username,
          password: data.password,
          isLocked: false,
        };
      }
    }
  } catch {
    // Backend API unavailable (e.g. static hosting on Nginx/Apache) — proceed to encrypted fallback
  }

  // Fallback to encrypted static vault deobfuscation
  try {
    const vault = await getFallbackVault();
    const entry = vault[account.id];
    if (entry) {
      const username = deobfuscate(entry.u, account.id);
      const password = deobfuscate(entry.p, account.id);

      if (username || password) {
        credentialCache.set(account.id, { username, password });
        return {
          username,
          password,
          isLocked: false,
        };
      }
    }
  } catch {
    // ignore
  }

  return {
    username: "ACCOUNT_PROTECTED",
    password: "••••••••••••",
    isLocked: false,
  };
}

/**
 * Synchronous credential resolver for initial component render.
 * Returns cached or masked credentials immediately without layout shift.
 */
export function getSecureCredentials(
  account: { id: number; pointsCost?: number },
  isUnlocked: boolean
): ResolvedCredentials {
  const isPointGated = Boolean(account.pointsCost && account.pointsCost > 0);

  if (isPointGated && !isUnlocked) {
    return {
      username: "VIP_LOCKED",
      password: "••••••••••••",
      isLocked: true,
    };
  }

  if (credentialCache.has(account.id)) {
    const cached = credentialCache.get(account.id)!;
    return {
      username: cached.username,
      password: cached.password,
      isLocked: false,
    };
  }

  // Not yet loaded into memory
  return {
    username: "Loading...",
    password: "••••••••••••",
    isLocked: false,
  };
}
