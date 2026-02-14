// Cache version constants - will be used in subsequent tasks
const _SHELL_CACHE = 'cookbox-shell-v1';
const _RECIPES_CACHE = 'cookbox-recipes-v1';

// Install event: set up the service worker
self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

// Activate event: placeholder for cache cleanup
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});
