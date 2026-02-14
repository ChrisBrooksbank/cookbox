# Implementation Plan

## Status

- Planning iterations: 2
- Build iterations: 1
- Last updated: 2026-02-14
- Current phase: Phase 1 (Foundation)

## Tasks

### Phase 1: Foundation (App Shell + Data)

**Goal:** Establish visual foundation with HTML/CSS, PWA assets, and initial recipe data.

- [x] Create index.html with semantic structure and dark theme meta tags (spec: app-shell.md, pwa-manifest.md)
    - Single-page HTML5 structure with header, main, nav
    - Meta tags for theme-color (#1a1a2e) and viewport
    - Links to manifest.json and favicon.svg

- [ ] Create css/style.css with dark warm theme, responsive layout, and 44px tap targets (spec: app-shell.md)
    - Dark warm color scheme: navy (#1a1a2e), gold (#e2b714), green (#4ade80)
    - Base font 18px, line-height 1.6, tap targets 44px minimum
    - Mobile-first responsive: single column <768px, two-column grid >768px
    - Desktop: sticky ingredients sidebar

- [ ] Create icons/favicon.svg with simple Cookbox logo (spec: app-shell.md, pwa-manifest.md)
    - Simple SVG icon suitable for scaling to PNG

- [ ] Create manifest.json with PWA metadata and theme colors (spec: pwa-manifest.md)
    - Name: "Cookbox", short_name: "Cookbox"
    - Theme color: #1a1a2e, display: standalone
    - Icon references for 192px and 512px

- [ ] Create icons/icon-192.png and icons/icon-512.png from favicon.svg (spec: pwa-manifest.md)
    - Generate PNG icons from SVG source

- [ ] Create recipes/mushroom-risotto.json with content from loveandlemons.com (spec: recipe-data.md)
    - Extract and structure recipe: ~12 ingredients, 4 steps, 2+ timed steps
    - Include all required fields: id, title, description, image, times, servings, tags, ingredients, steps

- [ ] Add recipes/images/mushroom-risotto.jpg hero image (spec: recipe-data.md)
    - Source appropriate recipe image

- [ ] Create recipes/index.json catalog array (spec: recipe-data.md)
    - Initially contains: ["mushroom-risotto"]

### Phase 2: Core Modules

**Goal:** Build reusable utility modules that recipe-view.js will depend on.

- [ ] Create js/storage.js with saveStep, loadStep, clearStep functions (spec: storage.md)
    - ES module exporting three functions
    - Key format: `cookbox:step:{recipeId}`
    - Graceful error handling for missing/corrupt data
    - Returns null for missing data, never throws

- [ ] Create js/timer.js with createTimer, playChime, and Web Audio API implementation (spec: timers.md)
    - Parse time strings ("8 min", "30 sec") into seconds
    - Countdown display in mm:ss format
    - Web Audio API chime generator (no external files)
    - Visual flash/pulse on completion
    - Support multiple simultaneous timers

### Phase 3: Recipe View

**Goal:** Build the core recipe detail UI with all interactive features.

- [ ] Create js/recipe-view.js with step state management (done/current/upcoming) (spec: recipe-view.md)
    - Render recipe header, hero image, ingredients list, all steps
    - Three step states: done (green), current (gold), upcoming (muted)
    - Click handler: tap any step to mark it current, auto-mark prior steps done
    - Integrate with storage.js to save/load current step

- [ ] Add ingredient checkbox toggles with strikethrough in recipe-view.js (spec: recipe-view.md)
    - Tap ingredients to toggle strikethrough
    - State is ephemeral (not persisted to localStorage)

- [ ] Add timer integration for steps with time field in recipe-view.js (spec: recipe-view.md, timers.md)
    - Render tap-to-start timer for steps with `time` field
    - Integrate timer.js module for countdown and chime

- [ ] Add progress bar (Step N of M) in recipe-view.js (spec: recipe-view.md)
    - Sticky at top of viewport
    - Updates as current step changes

- [ ] Add reset button with confirmation dialog in recipe-view.js (spec: recipe-view.md)
    - Button in header area
    - Shows confirm dialog before clearing
    - Calls storage.clearStep() and resets UI

- [ ] Add keyboard navigation (arrow keys) for steps in recipe-view.js (spec: recipe-view.md)
    - Up/Down arrows navigate between steps
    - Updates current step and scrolls into view

- [ ] Implement scroll-to-current-step on load in recipe-view.js (spec: recipe-view.md)
    - On initial render, scroll current step into view smoothly

### Phase 4: Navigation & Routing

**Goal:** Wire up navigation, fetch recipe data, and tie all modules together.

- [ ] Create js/app.js with hash-based router and hashchange listener (spec: routing.md)
    - ES module as entry point
    - Hash-based routing: empty hash = list, #recipe-id = detail
    - Listen to hashchange events for view switching
    - Browser back button support

- [ ] Add recipe list view rendering in app.js (spec: routing.md)
    - Fetch recipes/index.json for catalog
    - Render recipe cards with thumbnail, title, tags, total time
    - Click handlers to navigate to #recipe-id

- [ ] Add recipe detail view integration with recipe-view.js in app.js (spec: routing.md)
    - Fetch individual recipe JSON (e.g., recipes/mushroom-risotto.json)
    - Pass recipe data to recipe-view.js module for rendering

- [ ] Add service worker registration in app.js (spec: routing.md, service-worker.md)
    - Check for navigator.serviceWorker support
    - Register sw.js on DOMContentLoaded

### Phase 5: Offline Support

**Goal:** Implement service worker for offline PWA functionality.

- [ ] Create sw.js with cache versioning and install event (spec: service-worker.md)
    - Define cache names: cookbox-shell-v1, cookbox-recipes-v1
    - Install event handler

- [ ] Add app shell pre-caching strategy in sw.js (spec: service-worker.md)
    - Pre-cache on install: index.html, css/style.css, all js/\*.js, manifest.json, icons
    - waitUntil() to ensure caching completes before activation

- [ ] Add cache-on-use strategy for recipes and images in sw.js (spec: service-worker.md)
    - Fetch handler: cache recipes and images when first requested
    - Use cookbox-recipes-v1 cache for recipe JSON and images

- [ ] Add cache cleanup on activate event in sw.js (spec: service-worker.md)
    - Delete old cache versions on activate
    - Claim clients immediately

- [ ] Add network-first fetch strategy with cache fallback in sw.js (spec: service-worker.md)
    - Network-first for recipes (fresh data preferred)
    - Cache-first for app shell
    - Fallback to cache when offline

## Completed Tasks

<!-- Completed tasks move here with timestamp -->

None yet - ready to begin Phase 1.

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

### Verification Strategy

After each phase:

- Run `npm run lint` to check code quality
- Run `npx serve .` to test in browser
- Manual testing per PLAN.md verification steps
- Run `npm run test:e2e` to validate e2e tests pass
- Update e2e tests as needed to cover new features

### Task Completion Guidelines

- Mark tasks complete (✓) only when fully implemented AND tested
- Each task = one focused iteration in build mode
- If a task grows too large, break it into subtasks
- Keep tasks independent where possible for parallel work
