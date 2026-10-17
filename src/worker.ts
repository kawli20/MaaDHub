import { CREDENTIALS_STORE } from "./server/credentialsStore";
import { createRemoteJWKSet, jwtVerify } from "jose";

interface D1Result<T> {
  results: T[];
  meta?: { changes?: number };
}

interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  first<T>(): Promise<T | null>;
  all<T>(): Promise<D1Result<T>>;
  run(): Promise<D1Result<never>>;
}

interface D1Database {
  prepare(query: string): D1Statement;
}

interface Env {
  ASSETS: { fetch: (input: RequestInfo | URL) => Promise<Response> };
  DB: D1Database;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHANNEL_ID?: string;
}

const FALLBACK_TELEGRAM_CHANNEL = "-1004445400084";
const CLERK_ISSUER = "https://possible-tuna-2366.clerk.accounts.dev";
const CLERK_JWKS = createRemoteJWKSet(
  new URL(`${CLERK_ISSUER}/.well-known/jwks.json`)
);

interface PointsUserRow {
  clerk_user_id: string;
  referral_code: string;
  referred_by: string | null;
  points: number;
}

interface PointTransactionRow {
  id: string;
  reason: string;
  points_delta: number;
  created_at: string;
}

async function getAuthenticatedUserId(request: Request): Promise<string | null> {
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return null;

  try {
    const { payload } = await jwtVerify(authorization.slice(7), CLERK_JWKS, {
      issuer: CLERK_ISSUER,
    });
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

function jsonResponse(body: unknown, status: number, corsHeaders: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function getPointsProfile(db: D1Database, userId: string) {
  const [user, history, unlocks, referralStats] = await Promise.all([
    db.prepare(
      "SELECT clerk_user_id, referral_code, referred_by, points FROM users WHERE clerk_user_id = ?1"
    ).bind(userId).first<PointsUserRow>(),
    db.prepare(
      "SELECT id, reason, points_delta, created_at FROM point_transactions WHERE user_id = ?1 ORDER BY created_at DESC, rowid DESC LIMIT 50"
    ).bind(userId).all<PointTransactionRow>(),
    db.prepare("SELECT account_id FROM account_unlocks WHERE user_id = ?1")
      .bind(userId).all<{ account_id: number }>(),
    db.prepare(
        "SELECT COUNT(*) AS invited_count FROM referrals WHERE inviter_user_id = ?1"
      ).bind(userId).first<{ invited_count: number }>(),
  ]);

  if (!user) throw new Error("Points profile missing after synchronization");

  const earned = await db.prepare(
    "SELECT COALESCE(SUM(points_delta), 0) AS points_earned FROM point_transactions WHERE user_id = ?1 AND reason = 'referral_reward'"
  ).bind(userId).first<{ points_earned: number }>();

  return {
    points: user.points,
    referralCode: user.referral_code,
    referredBy: user.referred_by,
    invitedCount: referralStats?.invited_count ?? 0,
    pointsEarnedFromInvites: earned?.points_earned ?? 0,
    unlockedAccountIds: unlocks.results.map((row) => row.account_id),
    history: history.results.map((row) => ({
      id: row.id,
      title: row.reason === "welcome"
        ? "Welcome Bonus"
        : row.reason === "referral_bonus"
          ? "Invite bonus"
          : row.reason === "referral_reward"
            ? "Friend joined with your link"
            : row.reason.startsWith("unlock:")
              ? `Unlocked account ${row.reason.slice(7)}`
              : row.reason,
      pointsDelta: row.points_delta,
      timestamp: row.created_at,
      type: row.reason.startsWith("unlock:") ? "unlock" : row.reason,
    })),
  };
}

async function syncPointsProfile(request: Request, env: Env, corsHeaders: Record<string, string>): Promise<Response> {
  const userId = await getAuthenticatedUserId(request);
  if (!userId) return jsonResponse({ error: "Authentication required" }, 401, corsHeaders);

  let referralCode: string | null = null;
  try {
    const body = await request.json() as { referralCode?: unknown };
    if (typeof body.referralCode === "string") {
      referralCode = body.referralCode.trim().toUpperCase().slice(0, 32) || null;
    }
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400, corsHeaders);
  }

  const generatedCode = `MDH${crypto.randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`;
  try {
    await env.DB.prepare(
      `INSERT OR IGNORE INTO users (clerk_user_id, referral_code, referred_by)
       VALUES (?1, ?2, (SELECT clerk_user_id FROM users WHERE referral_code = ?3 AND clerk_user_id <> ?1))`
    ).bind(userId, generatedCode, referralCode).run();

    const profile = await getPointsProfile(env.DB, userId);
    return jsonResponse(profile, 200, corsHeaders);
  } catch (error) {
    console.error("Points profile sync failed", error);
    return jsonResponse({ error: "Unable to sync points profile" }, 500, corsHeaders);
  }
}

async function unlockPointsAccount(request: Request, env: Env, corsHeaders: Record<string, string>): Promise<Response> {
  const userId = await getAuthenticatedUserId(request);
  if (!userId) return jsonResponse({ error: "Authentication required" }, 401, corsHeaders);

  let accountId: number;
  try {
    const body = await request.json() as { accountId?: unknown };
    accountId = Number(body.accountId);
    if (!Number.isSafeInteger(accountId) || accountId <= 0) {
      return jsonResponse({ error: "Invalid account ID" }, 400, corsHeaders);
    }
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400, corsHeaders);
  }

  try {
    const result = await env.DB.prepare(
      `INSERT OR IGNORE INTO account_unlocks (user_id, account_id, points_cost)
       SELECT ?1, costs.account_id, costs.points_cost
       FROM account_point_costs AS costs
       JOIN users AS user ON user.clerk_user_id = ?1
       WHERE costs.account_id = ?2 AND user.points >= costs.points_cost`
    ).bind(userId, accountId).run();

    const alreadyUnlocked = await env.DB.prepare(
      "SELECT 1 AS unlocked FROM account_unlocks WHERE user_id = ?1 AND account_id = ?2"
    ).bind(userId, accountId).first<{ unlocked: number }>();
    if (!alreadyUnlocked) {
      const knownAccount = await env.DB.prepare(
        "SELECT 1 AS known FROM account_point_costs WHERE account_id = ?1"
      ).bind(accountId).first<{ known: number }>();
      if (!knownAccount) return jsonResponse({ error: "Account is not point-gated" }, 404, corsHeaders);
      return jsonResponse({ error: "Insufficient points" }, 409, corsHeaders);
    }

    const profile = await getPointsProfile(env.DB, userId);
    return jsonResponse({ ...profile, newlyUnlocked: (result.meta?.changes ?? 0) > 0 }, 200, corsHeaders);
  } catch (error) {
    console.error("Points account unlock failed", error);
    return jsonResponse({ error: "Unable to unlock account" }, 500, corsHeaders);
  }
}

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

    if (url.pathname === "/api/points/sync" && request.method === "POST") {
      return syncPointsProfile(request, env, corsHeaders);
    }

    if (url.pathname === "/api/points/unlock" && request.method === "POST") {
      return unlockPointsAccount(request, env, corsHeaders);
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
