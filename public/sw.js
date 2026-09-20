const CACHE_NAME = "maadhub-pwa-v3";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/logo.png",
  "/manifest.json",
  "/games/steam.jpg",
  "/games/epic.jpg",
  "/games/xbox.jpg",
  "/games/playstation.jpg",
  "/games/netflix.jpg",
  "/games/spotify.jpg",
  "/games/ubisoft.jpg",
  "/games/ea.jpg",
  "/games/riot.jpg",
  "/games/battlenet.jpg",
];

// Install: Cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        STATIC_ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn("Asset cache skipped:", url, err))
        )
      );
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Stale-While-Revalidate for static assets, network-first for pages
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Ignore non-GET, non-http(s), and chrome-extension requests
  if (req.method !== "GET" || !req.url.startsWith("http")) {
    return;
  }

  const url = new URL(req.url);

  // Skip telegram API & non-origin external APIs (except images)
  if (url.hostname.includes("api.telegram.org")) {
    return;
  }

  // Handle Images
  if (req.destination === "image" || url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req);
        if (cached) {
          // background refresh
          fetch(req)
            .then((res) => {
              if (res && res.status === 200) {
                cache.put(req, res.clone());
              }
            })
            .catch(() => {});
          return cached;
        }

        try {
          const networkRes = await fetch(req);
          if (networkRes && networkRes.status === 200) {
            cache.put(req, networkRes.clone());
          }
          return networkRes;
        } catch {
          const fallback = await cache.match("/games/steam.jpg");
          return fallback || new Response("", { status: 404 });
        }
      })
    );
    return;
  }

  // Navigation requests
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          const indexCached = await caches.match("/index.html");
          return indexCached || new Response("Offline", { status: 503 });
        })
    );
    return;
  }

  // General static assets (JS, CSS, fonts)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200 && req.url.startsWith(self.location.origin)) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return networkRes;
        })
        .catch(() => cached || new Response("Network error", { status: 408 }));
    })
  );
});
