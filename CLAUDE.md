# CLAUDE.md

## Project Overview

Cookbox — an ADHD-friendly recipe PWA. Step-by-step cooking instructions with multiple simultaneous timers, progress tracking, and a calm, focused interface. Built with vanilla JS, no framework.

**Live:** https://cookbox-pwa.netlify.app

## Tech Stack

- Vanilla JavaScript (no framework)
- CSS (in `css/` directory)
- Service Worker (`sw.js`) for offline/PWA
- Recipes as structured data in `recipes/`
- Deployed on Netlify

## File Structure

```
index.html      — Main page
js/             — JavaScript modules
css/            — Stylesheets
recipes/        — Recipe data files
icons/          — App icons
manifest.json   — PWA manifest
sw.js           — Service worker
```

## Development

No build step. Serve with any static server:

```bash
npx serve .
```

## Design Principles

ADHD-friendly means:
- One step visible at a time (reduce overwhelm)
- Large, clear timer displays
- Minimal distractions — no ads, no clutter
- Progress clearly visible at all times

## Deployment

Deployed on Netlify as a static site.
