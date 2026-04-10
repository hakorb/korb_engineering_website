/* ============================================================
   sw.js — korb.engineering offline shell service worker
   ------------------------------------------------------------
   Strategy:
     - Precache the minimal SPA shell (index, app.js, style.css,
       favicon, manifest) on install.
     - For shell assets: cache-first, network fallback.
     - For tool HTML (tools/**): stale-while-revalidate so the
       user always gets fresh tool code when online but can still
       open previously-visited tools offline.
     - For everything else (fonts, APIs, etc.): network-first
       with no cache writeback (don't pollute the cache).

   Bump CACHE_VERSION whenever the shell changes significantly.
   ============================================================ */

const CACHE_VERSION = 'korb-shell-v1';
const TOOL_CACHE    = 'korb-tools-v1';

const SHELL_ASSETS = [
  './',
  './index.html',
  './app.js',
  './style.css',
  './favicon.svg',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => { /* best-effort: don't block install on network hiccups */ })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys
        .filter((k) => k !== CACHE_VERSION && k !== TOOL_CACHE)
        .map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Only handle same-origin requests — never cache third-party
  // fonts, APIs, or analytics even accidentally.
  if (url.origin !== self.location.origin) return;

  const isToolHtml = url.pathname.includes('/tools/') && url.pathname.endsWith('.html');
  const isShellAsset = SHELL_ASSETS.some((p) => {
    const full = new URL(p, self.location.origin).pathname;
    return url.pathname === full || (p === './' && url.pathname === '/');
  });

  if (isShellAsset) {
    // Cache-first for the shell
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match('./index.html')))
    );
    return;
  }

  if (isToolHtml) {
    // Stale-while-revalidate for tool HTML
    event.respondWith(
      caches.open(TOOL_CACHE).then((cache) =>
        cache.match(req).then((hit) => {
          const fetchPromise = fetch(req).then((res) => {
            if (res && res.status === 200) cache.put(req, res.clone());
            return res;
          }).catch(() => hit);
          return hit || fetchPromise;
        })
      )
    );
    return;
  }

  // Default: try network, fall back to cache if we happen to have it
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
