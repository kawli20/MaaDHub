/**
 * Ultra-fast CDN image optimizer using wsrv.nl
 * Converts heavy external images (1MB-3MB) to compressed WebP (15KB-30KB)
 */
export function getOptimizedImageUrl(
  url?: string,
  width: number = 400,
  quality: number = 75
): string {
  if (!url) return "";

  // If local asset or svg or data url, return directly
  if (
    url.startsWith("/") ||
    url.startsWith("data:") ||
    url.startsWith("blob:") ||
    url.includes("wsrv.nl") ||
    url.endsWith(".svg")
  ) {
    return url;
  }

  // Only optimize remote HTTP/HTTPS URLs
  if (url.startsWith("http://") || url.startsWith("https://")) {
    // encode URL for wsrv.nl proxy
    return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=${quality}&output=webp&default=https%3A%2F%2Fmaadhub.vercel.app%2Fgames%2Fsteam.jpg`;
  }

  return url;
}
