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
  index.html                       # Single-page app shell
  css/style.css                    # Dark theme, responsive, ADHD-friendly styles
  js/app.js                        # Entry point: routing, service worker registration
  js/recipe-view.js                # Step tracking, progress bar, timers, rendering
  js/storage.js                    # localStorage wrapper (persist current step)
  js/timer.js                      # Countdown timer logic + audio chime
  recipes/index.json               # Recipe catalog (add entries here for new recipes)
  recipes/mushroom-risotto.json    # First recipe (sourced from loveandlemons.com)
  recipes/images/mushroom-risotto.jpg  # Recipe hero/card image
  manifest.json                    # PWA manifest
  sw.js                            # Service worker (cache-on-use, offline support)
  icons/favicon.svg                # Simple SVG favicon
  icons/icon-192.png               # PWA icon
  icons/icon-512.png               # PWA icon
```

## ADHD-Friendly UX Design

### Core principles
- **All steps visible at once** - no accordions, no "show more", no pagination
- **Three visual states** - done (green tint), current (amber/gold highlight), upcoming (muted)
- **Tap any step** to mark it current; all prior steps become "done" automatically
- **Tap-to-start timers** - steps with a `time` field get a countdown timer; tap to start
- **Timer alerts** - visual flash + audio chime (Web Audio API) when timer completes
- **Checkable ingredients** - tap to strikethrough as you prep (ephemeral, resets on reload)
- **Progress bar** sticky at top - always shows "Step N of M"
- **Reset button** with confirm dialog - clears step progress for a recipe
- **Persistent state** - current step saved to localStorage per recipe; resume after interruption
- **Large text** (18px base), generous line height (1.6), large tap targets
- **No decorative animations** - smooth scroll only when needed
- **Keyboard support** - arrow keys to navigate steps (useful with messy hands)

### Layout
- **Mobile** (<768px): single column - hero image, ingredients panel, then steps below
- **Desktop** (>768px): two-column grid - sticky ingredients sidebar + steps
- Dark warm color scheme: navy background, gold accent for current step, green for done

### Recipe views
1. **Recipe List** - cards with thumbnail image, title, tags (meal type + diet + effort/time), total time
2. **Recipe Detail** - hero image + header + reset button + progress bar + checkable ingredients + all steps with timers

## Recipe Data Format
Each recipe is a JSON file in `recipes/`. Adding a recipe = drop in a JSON file + add one entry to `recipes/index.json`.

```json
{
  "id": "mushroom-risotto",
  "title": "Mushroom Risotto",
  "description": "Creamy arborio rice with mixed mushrooms...",
  "image": "recipes/images/mushroom-risotto.jpg",
  "prepTime": 15,
  "cookTime": 30,
  "totalTime": 45,
  "servings": "4-6",
  "tags": ["dinner", "vegetarian", "comfort food", "45 min"],
  "ingredients": [
    { "amount": "4 tbsp", "item": "extra-virgin olive oil" },
    { "amount": "1.5 lb", "item": "mixed mushrooms", "note": "chopped" }
  ],
  "steps": [
    {
      "title": "Saut\u00e9 the mushrooms",
      "body": "Heat 2 tbsp olive oil in a Dutch oven over medium heat...",
      "time": "8 min"
    }
  ]
}
```

Tags combine meal type (`dinner`), diet (`vegetarian`), and effort/time (`45 min`, `easy`). The `image` field points to a file in `recipes/images/`. Steps with a `time` field get a tap-to-start countdown timer.

## Offline Strategy
- **App shell** (HTML, CSS, JS, manifest, icons) is **pre-cached** on service worker install
- **Recipes** (JSON + images) are **cached on use** - cached when first fetched, served from cache thereafter
- This keeps initial install lightweight and scales as recipes grow

## Future Considerations (not in v1)
- **Import from URL** - paste a recipe URL and parse structured data (JSON-LD) from recipe sites
- **Tag filtering** - filter recipe list by tags
- **Add recipe UI** - form-based recipe entry

## Implementation Order
1. Create `index.html` with semantic structure + `css/style.css` with dark theme
2. Create recipe JSON files (`index.json` + `mushroom-risotto.json`) + recipe image
3. Create `js/storage.js` - localStorage wrapper
4. Create `js/timer.js` - countdown timer logic + Web Audio API chime
5. Create `js/recipe-view.js` - step rendering, click handling, progress bar, timers, checkable ingredients, reset
6. Create `js/app.js` - routing (hash-based), recipe loading, service worker registration
7. Create `manifest.json` + PWA icons (SVG favicon + PNG icons)
8. Create `sw.js` - pre-cache app shell, cache-on-use for recipes/images

## Verification
1. Run `npx serve .` from `c:\code\food`
2. Open `http://localhost:3000` - recipe list should appear with card image + tags
3. Click mushroom risotto - hero image, all 4 steps visible, tap steps to track progress
4. Tap a step's timer - countdown should start and chime when done
5. Tap ingredients to check them off (strikethrough)
6. Close and reopen browser - current step should be preserved
7. Click reset - confirm dialog, then progress clears
8. Check Chrome DevTools > Application > Manifest - should show installable
9. Visit a recipe, then toggle offline in DevTools > Network - cached recipe should still work
10. Test on mobile viewport (Chrome DevTools device toolbar)
