export const TELEGRAM_BOT_TOKEN = "8647581584:AAGvkz7tBGiuX94c-2OR-LZBKepi1equg8U";
export const TELEGRAM_CHANNEL_ID = "-1004445400084";

export async function sendToTelegram(text: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          chat_id: TELEGRAM_CHANNEL_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );
    const data = await response.json();
    return Boolean(data && data.ok);
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
  username: string;
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
    `👤 <b>Username:</b> <code>${escapeHtml(username)}</code>`,
    `🆔 <b>Account ID:</b> <code>#${accountId}</code>`,
    reason ? `📝 <b>Issue / Note:</b> ${escapeHtml(reason)}` : `📝 <b>Issue:</b> Account reported as non-working`,
    `⏰ <b>Time (UTC):</b> <i>${time}</i>`,
  ].join("\n");

  return sendToTelegram(message);
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
