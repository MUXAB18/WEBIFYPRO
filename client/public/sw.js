// Webify Pro Service Worker — v1.0
// Caches core assets for offline support (PWA)

const CACHE_NAME = 'webify-pro-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.png',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Cache-first for static assets, network-first for API calls
  if (event.request.url.includes('/api/')) {
    // Network first for API
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  } else {
    // Cache first for static
    event.respondWith(
      caches.match(event.request).then(
        (cached) => cached || fetch(event.request)
      )
    );
  }
});
