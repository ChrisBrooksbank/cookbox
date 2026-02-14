# AGENTS.md - Operational Guide

Keep this file under 60 lines. It's loaded every iteration.

## Tech Stack

- Vanilla HTML/CSS/JS (no framework, no build step, no runtime dependencies)
- ES modules (`type="module"`)
- PWA via manifest.json + service worker

## Dev Server

```bash
npx serve . -l 3000    # Serve at http://localhost:3000
```

## Validation (run before finishing each iteration)

```bash
npx eslint .                  # Lint JS
npx prettier --check .        # Check formatting
npx playwright test           # Run e2e tests (starts serve automatically)
```

Run all three. Fix any failures before committing.

## Test Commands

```bash
npx playwright test                        # All e2e tests
npx playwright test --update-snapshots     # Update visual baselines
npx playwright test e2e/interaction.spec.js  # Interaction tests only
```

## Project Structure

```
index.html                       # SPA shell
css/style.css                    # Dark theme, responsive
js/app.js                        # Entry: routing, SW registration
js/recipe-view.js                # Step tracking, progress, timers
js/storage.js                    # localStorage wrapper
js/timer.js                      # Countdown + Web Audio chime
recipes/index.json               # Recipe catalog
recipes/mushroom-risotto.json    # First recipe
recipes/images/                  # Recipe images
manifest.json                   # PWA manifest
sw.js                            # Service worker (cache-on-use)
icons/                           # Favicon + PWA icons
```

## Key Patterns

- Hash-based routing: `#recipe-id` for detail view, empty hash for list
- Recipe data: JSON files in `recipes/`, catalog in `recipes/index.json`
- State: localStorage keyed by recipe ID, stores current step index
- Dark theme: navy bg (#1a1a2e), gold accent (#e2b714), green done (#4ade80)
- ADHD UX: all steps visible, large tap targets, no decorative animations

## Notes

- No `console.log` in production code (eslint `no-console: warn`)
- Prefer `const` over `let` (eslint `prefer-const: warn`)
- No `var` allowed (eslint `no-var: error`)
