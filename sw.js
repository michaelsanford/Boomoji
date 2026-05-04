const CACHE = 'boomoji-v4';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './js/app.js',
  './js/sounds.js',
  './js/particles.js',
  './js/pop-game.js',
  './js/reveal-game.js',
  './js/grow-game.js',
  './js/rain-game.js',
  './js/stickers-game.js',
  './manifest.json',
  './icons/icon.svg',
];

/* PNG icons are not git-tracked; cache them if present but don't fail install */
const ICON_PNGS = [
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async c => {
      await c.addAll(ASSETS);
      await Promise.allSettled(ICON_PNGS.map(url => c.add(url).catch(() => {})));
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
