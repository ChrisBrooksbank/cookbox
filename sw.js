// Cache version constants
const SHELL_CACHE = 'cookbox-shell-v1';
const _RECIPES_CACHE = 'cookbox-recipes-v1';

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
