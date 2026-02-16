# Service Worker

## Overview

Create the service worker for offline support using a cache-on-use strategy for recipes.

## Requirements

- [ ] `sw.js` at the root of the project
- [ ] **Pre-cache on install**: app shell files (HTML, CSS, JS, manifest, icons)
- [ ] **Cache-on-use**: recipe JSON and images cached when first fetched
- [ ] Cache versioning for updates (e.g., `cookbox-shell-v1`, `cookbox-recipes-v1`)
- [ ] Clean up old caches on activate
- [ ] Network-first for recipe data (fall back to cache when offline)
- [ ] Cache-first for app shell (fast loads)

### Pre-cached files (app shell)

- `index.html`
- `css/style.css`
- `js/app.js`
- `js/recipe-view.js`
- `js/storage.js`
- `js/timer.js`
- `manifest.json`
- `icons/favicon.svg`
- `icons/icon-192.png`
- `icons/icon-512.png`

## Acceptance Criteria

- [ ] App shell loads offline after first visit
- [ ] Visited recipes work offline (JSON + images cached)
- [ ] Unvisited recipes show graceful error when offline
- [ ] New deployments activate updated cache
- [ ] No stale content served after cache update

## Out of Scope

- Background sync
- Push notifications
- Pre-caching all recipes
