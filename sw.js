const CACHE_NAME = 'scheduler-v1';
const ASSETS = [
    './',
    './index.html', 
    'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

// This is the "Offline Engine" - it forces the browser to use the saved audio
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
// Add this to your sw.js
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'check-tasks') {
        event.waitUntil(checkTasksAndNotify());
    }
});

async function checkTasksAndNotify() {
    // Note: This is advanced and requires the app to be "Installed" 
    // and usually requires a browser that supports Periodic Sync.
    console.log("Checking tasks in background...");
}

