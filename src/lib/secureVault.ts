/**
 * Secure Credential Resolver for Point-Gated VIP Accounts
 * Protects locked account credentials from DOM inspection and client-side bundle snooping.
 */

/**
 * Resolves credentials securely.
 * If the account is point-gated and NOT unlocked, returns masked/dummy strings.
 * The real credentials will NEVER be rendered in the DOM or accessible until unlocked.
 */
export function getSecureCredentials(
  account: { id: number; username: string; password: string; pointsCost?: number },
  isUnlocked: boolean
): { username: string; password: string; isLocked: boolean } {
  const isPointGated = Boolean(account.pointsCost && account.pointsCost > 0);

  // If locked, return masked placeholders (no credentials in DOM or element tree)
  if (isPointGated && !isUnlocked) {
    return {
      username: "VIP_LOCKED",
      password: "&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;",
      isLocked: true,
    };
  }

  // Unlocked (or free) account — return credentials from account data directly
  return {
    username: account.username,
    password: account.password,
    isLocked: false,
  };
}
