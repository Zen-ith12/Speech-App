const CACHE_NAME = 'jw-speech-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './jw_speech_icon.png',
  'https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap'
];

// Instalar y guardar archivos en caché
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar y limpiar cachés antiguas si las hay
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 

// Interceptar solicitudes y responder con caché o red
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
