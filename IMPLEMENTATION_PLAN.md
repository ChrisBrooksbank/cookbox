# Implementation Plan

## Status

- Planning iterations: 1
- Build iterations: 0
- Last updated: 2026-02-14

## Tasks

### Phase 1: Foundation (App Shell + Data)

- [ ] Create index.html with semantic structure and dark theme meta tags (spec: app-shell.md, pwa-manifest.md)
- [ ] Create css/style.css with dark warm theme, responsive layout, and 44px tap targets (spec: app-shell.md)
- [ ] Create icons/favicon.svg with simple Cookbox logo (spec: app-shell.md, pwa-manifest.md)
- [ ] Create manifest.json with PWA metadata and theme colors (spec: pwa-manifest.md)
- [ ] Create icons/icon-192.png and icons/icon-512.png from favicon.svg (spec: pwa-manifest.md)
- [ ] Create recipes/mushroom-risotto.json with content from loveandlemons.com (spec: recipe-data.md)
- [ ] Add recipes/images/mushroom-risotto.jpg hero image (spec: recipe-data.md)
- [ ] Create recipes/index.json catalog array (spec: recipe-data.md)

### Phase 2: Core Modules

- [ ] Create js/storage.js with saveStep, loadStep, clearStep functions (spec: storage.md)
- [ ] Create js/timer.js with createTimer, playChime, and Web Audio API implementation (spec: timers.md)

### Phase 3: Recipe View

- [ ] Create js/recipe-view.js with step state management (done/current/upcoming) (spec: recipe-view.md)
- [ ] Add ingredient checkbox toggles with strikethrough in recipe-view.js (spec: recipe-view.md)
- [ ] Add timer integration for steps with time field in recipe-view.js (spec: recipe-view.md, timers.md)
- [ ] Add progress bar (Step N of M) in recipe-view.js (spec: recipe-view.md)
- [ ] Add reset button with confirmation dialog in recipe-view.js (spec: recipe-view.md)
- [ ] Add keyboard navigation (arrow keys) for steps in recipe-view.js (spec: recipe-view.md)
- [ ] Implement scroll-to-current-step on load in recipe-view.js (spec: recipe-view.md)

### Phase 4: Navigation & Routing

- [ ] Create js/app.js with hash-based router and hashchange listener (spec: routing.md)
- [ ] Add recipe list view rendering in app.js (spec: routing.md)
- [ ] Add recipe detail view integration with recipe-view.js in app.js (spec: routing.md)
- [ ] Add service worker registration in app.js (spec: routing.md, service-worker.md)

### Phase 5: Offline Support

- [ ] Create sw.js with cache versioning and install event (spec: service-worker.md)
- [ ] Add app shell pre-caching strategy in sw.js (spec: service-worker.md)
- [ ] Add cache-on-use strategy for recipes and images in sw.js (spec: service-worker.md)
- [ ] Add cache cleanup on activate event in sw.js (spec: service-worker.md)
- [ ] Add network-first fetch strategy with cache fallback in sw.js (spec: service-worker.md)

## Completed

<!-- Completed tasks move here -->

## Notes

### Architecture Decisions

- **Vanilla JS**: No frameworks, no build step - keeps it simple and fast
- **ES Modules**: All JS files use import/export for clean separation
- **Hash Routing**: Simple client-side routing without server config
- **localStorage Only**: Step progress persisted; ingredient checks and timers are ephemeral
- **Web Audio API**: Chime sound generated programmatically (no external files)
- **Mobile-First CSS**: Single column <768px, sticky sidebar >768px
- **ADHD-Friendly UX**: All steps visible, large text (18px), no animations except smooth scroll

### Implementation Order Rationale

1. **Foundation first**: HTML/CSS/icons/manifest establish the shell and visual design
2. **Data next**: Recipe JSON allows testing with real content
3. **Core modules**: Storage and timer are independent utilities needed by recipe view
4. **Recipe view**: The main feature - depends on storage, timer, and data
5. **Routing last**: Ties everything together and adds navigation
6. **Service worker last**: Caches all the files created in prior phases
