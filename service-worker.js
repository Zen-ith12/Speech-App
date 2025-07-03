self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('jw-speech-cache').then(function(cache) {
      return cache.addAll(['index.html', 'manifest.json', 'jw_speech_icon.png']);
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
