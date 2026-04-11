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

// Bumped to v2 after SECURITY-REVIEW M5 (LRU cap, https guard, audit sweep).
const CACHE_VERSION = 'korb-shell-v2';
const TOOL_CACHE    = 'korb-tools-v2';

// LRU cap on the tool cache. 228 tools * a few hundred KB each would blow
// past the browser's per-origin quota on mobile. Keep the 30 most recently
// opened tools; the rest fall through to network.
const TOOL_CACHE_MAX = 30;

async function trimCache(cacheName, maxEntries) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length <= maxEntries) return;
    // Oldest first (FIFO approximation — no per-entry timestamp in the
    // Cache API, but Request order is insertion order in practice).
    const excess = keys.length - maxEntries;
    for (let i = 0; i < excess; i++) {
      await cache.delete(keys[i]);
    }
  } catch (e) { /* ignore */ }
}

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

  // Only cache over https (or localhost for dev). Caching plaintext http
  // responses would let a network-level attacker poison the shell.
  const isSecure = url.protocol === 'https:' || url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  if (!isSecure) return;

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
            if (res && res.status === 200) {
              cache.put(req, res.clone()).then(() => trimCache(TOOL_CACHE, TOOL_CACHE_MAX));
            }
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
