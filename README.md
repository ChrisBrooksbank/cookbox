# Cookbox

An ADHD-friendly recipe PWA for step-by-step cooking with multiple timers, progress tracking, and a calm, focused interface.

**Live:** https://cookbox-pwa.netlify.app

## Features

- **Step-by-step cooking** — One step at a time, no wall of text
- **Multiple timers** — Run simultaneous timers for different cooking tasks
- **Progress tracking** — Visual progress through a recipe
- **Calm interface** — Focused design that reduces cognitive load
- **Offline support** — Works without internet once installed
- **PWA** — Installable on mobile and desktop

## Tech Stack

- Vanilla JavaScript
- Service Worker (offline/PWA)
- Recipes stored as structured data in `recipes/`
- Deployed on Netlify

## Development

No build step. Serve `index.html` with a local static server:

```bash
npx serve .
```

## Deployment

Deployed on Netlify as a static site.
