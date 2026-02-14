# Cookbox - ADHD-Friendly Recipe PWA

## Context
You found a mushroom risotto recipe and need a cooking companion app that works with your ADHD brain: see all steps at once, track where you are, and pick up where you left off if interrupted. Built as a PWA so it works offline and can be installed on your phone. Designed to grow as you add more recipes.

## Tech Stack
- **Vanilla HTML/CSS/JS** - no framework, no build step, no dependencies
- **ES modules** (`type="module"`) for clean code organization
- **`npx serve .`** for local dev server
- PWA via `manifest.json` + service worker

## File Structure
```
c:\code\food\
  index.html                  # Single-page app shell
  css/style.css               # Dark theme, responsive, ADHD-friendly styles
  js/app.js                   # Entry point: routing, service worker registration
  js/recipe-view.js           # Step tracking, progress bar, rendering
  js/storage.js               # localStorage wrapper (persist current step)
  recipes/index.json           # Recipe catalog (add entries here for new recipes)
  recipes/mushroom-risotto.json # First recipe
  manifest.json               # PWA manifest
  sw.js                       # Service worker (cache-first, offline support)
  icons/favicon.svg           # Simple SVG favicon
  icons/icon-192.png          # PWA icon
  icons/icon-512.png          # PWA icon
```

## ADHD-Friendly UX Design

### Core principles
- **All steps visible at once** - no accordions, no "show more", no pagination
- **Three visual states** - done (green tint), current (amber/gold highlight), upcoming (muted)
- **Tap any step** to mark it current; all prior steps become "done" automatically
- **Progress bar** sticky at top - always shows "Step N of M"
- **Persistent state** - current step saved to localStorage per recipe; resume after interruption
- **Large text** (18px base), generous line height (1.6), large tap targets
- **No decorative animations** - smooth scroll only when needed
- **Keyboard support** - arrow keys to navigate steps (useful with messy hands)

### Layout
- **Mobile** (<768px): single column - ingredients panel at top, steps below
- **Desktop** (>768px): two-column grid - sticky ingredients sidebar + steps
- Dark warm color scheme: navy background, gold accent for current step, green for done

### Recipe views
1. **Recipe List** - simple cards showing title, tags, time (scales to many recipes)
2. **Recipe Detail** - header + progress bar + ingredients + all steps

## Recipe Data Format
Each recipe is a JSON file in `recipes/`. Adding a recipe = drop in a JSON file + add one entry to `recipes/index.json`.

Steps have `title` (scannable), `body` (detailed instruction), and `time` fields. Ingredients use structured `amount`/`item`/`note` fields.

## Implementation Order
1. Create `index.html` with semantic structure + `css/style.css` with dark theme
2. Create recipe JSON files (`index.json` + `mushroom-risotto.json`)
3. Create `js/storage.js` - localStorage wrapper
4. Create `js/recipe-view.js` - step rendering, click handling, progress bar
5. Create `js/app.js` - routing (hash-based), recipe loading, service worker registration
6. Create `manifest.json` + generate PWA icons (SVG favicon + PNG icons)
7. Create `sw.js` - pre-cache app shell + recipes, cache-first fetch strategy

## Verification
1. Run `npx serve .` from `c:\code\food`
2. Open `http://localhost:3000` - recipe list should appear
3. Click mushroom risotto - all 4 steps visible, tap steps to track progress
4. Close and reopen browser - current step should be preserved
5. Check Chrome DevTools > Application > Manifest - should show installable
6. Toggle offline in DevTools > Network - app should still work
7. Test on mobile viewport (Chrome DevTools device toolbar)
