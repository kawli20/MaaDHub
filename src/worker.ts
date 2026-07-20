export default {
  async fetch(request: Request, env: { ASSETS: { fetch: (input: RequestInfo | URL) => Promise<Response> } }) {
    const assetResponse = await env.ASSETS.fetch(request)

    if (assetResponse.status === 404) {
      const fallbackUrl = new URL('/index.html', request.url)
      return env.ASSETS.fetch(new Request(fallbackUrl, request))
    }

    return assetResponse
  },
}
