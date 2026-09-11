/**
 * Telegram Notification Service
 * Secure: Bot tokens and channel credentials are kept strictly server-side
 * and NEVER exposed to the client-side JavaScript bundle.
 */

export async function sendToTelegram(text: string): Promise<boolean> {
  try {
    const apiUrl = import.meta.env.VITE_TELEGRAM_API_URL || "/api/telegram";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      console.warn("Telegram dispatch returned status:", response.status);
      return false;
    }

    const data = await response.json().catch(() => null);
    return Boolean(data && (data.ok || data.success));
  } catch (error) {
    console.error("Telegram send error:", error);
    return false;
  }
}

export async function reportBrokenAccount({
  accountId,
  gameName,
  platform,
  username,
  reason,
}: {
  accountId: number;
  gameName: string;
  platform: string;
  username?: string;
  reason?: string;
}): Promise<boolean> {
  const time = new Date().toLocaleString("en-US", {
    timeZone: "UTC",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const message = [
    `🚨 <b>BROKEN ACCOUNT REPORT</b>`,
    ``,
    `🎮 <b>Game:</b> <code>${escapeHtml(gameName)}</code>`,
    `🏷️ <b>Platform:</b> <code>${escapeHtml(platform)}</code>`,
    username && username !== "VIP_LOCKED" ? `👤 <b>Username:</b> <code>${escapeHtml(username)}</code>` : "",
    `🆔 <b>Account ID:</b> <code>#${accountId}</code>`,
    reason ? `📝 <b>Issue / Note:</b> ${escapeHtml(reason)}` : `📝 <b>Issue:</b> Account reported as non-working`,
    `⏰ <b>Time (UTC):</b> <i>${time}</i>`,
  ]
    .filter(Boolean)
    .join("\n");

  return sendToTelegram(message);
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
