const CACHE_NAME = 'scheduler-v1';
const ASSETS = [
    './',
    './index.html',
    // Use the exact URL from your <audio> tag
    'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching assets for offline use');
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (e) => {
    // This allows the app to serve the cached audio even when the internet is off
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});
