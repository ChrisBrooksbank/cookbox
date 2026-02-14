// Cache version constants
const SHELL_CACHE = 'cookbox-shell-v1';
const RECIPES_CACHE = 'cookbox-recipes-v1';

// App shell files to pre-cache on install
const SHELL_FILES = [
    './index.html',
    './css/style.css',
    './js/app.js',
    './js/recipe-view.js',
    './js/storage.js',
    './js/timer.js',
    './manifest.json',
    './icons/favicon.svg',
    './icons/icon-192.png',
    './icons/icon-512.png',
];

// Install event: pre-cache app shell
self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(SHELL_CACHE)
            .then(cache => cache.addAll(SHELL_FILES))
            .then(() => self.skipWaiting())
    );
});

// Activate event: placeholder for cache cleanup
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

// Fetch event: cache-on-use strategy for recipes and images
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Check if this is a recipe or image request
    const isRecipe = url.pathname.startsWith('/recipes/');

    if (isRecipe) {
        // Network-first strategy for recipes (prefer fresh data, fallback to cache when offline)
        event.respondWith(
            fetch(request)
                .then(response => {
                    // Clone the response before caching
                    const responseToCache = response.clone();
                    caches.open(RECIPES_CACHE).then(cache => {
                        cache.put(request, responseToCache);
                    });
                    return response;
                })
                .catch(() => {
                    // Network failed, try cache
                    return caches.match(request);
                })
        );
    } else {
        // Cache-first strategy for app shell (fast loads)
        event.respondWith(
            caches.match(request).then(response => {
                return response || fetch(request);
            })
        );
    }
});
