const CACHE_NAME = 'alarm-cache-v1';
const ASSETS = [
    './index.html', // Use your actual file name
    'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'
];

// Install: Save files to the phone's cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Fetch: Serve files from cache when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

