# PWA Manifest & Icons

## Overview

Create the PWA manifest and app icons for installability.

## Requirements

- [ ] `manifest.json` with app metadata
    - name: "Cookbox"
    - short_name: "Cookbox"
    - description: "ADHD-friendly recipe companion"
    - theme_color: "#1a1a2e" (navy)
    - background_color: "#1a1a2e"
    - display: "standalone"
    - start_url: "/"
    - icons array referencing PNG icons
- [ ] `icons/icon-192.png` - 192x192 PWA icon
- [ ] `icons/icon-512.png` - 512x512 PWA icon
- [ ] `icons/favicon.svg` - simple SVG favicon
- [ ] Link manifest in index.html `<head>`
- [ ] Add meta tags for theme-color, apple-mobile-web-app-capable

## Acceptance Criteria

- [ ] Chrome DevTools > Application > Manifest shows "installable"
- [ ] Icons display correctly
- [ ] Theme color matches the dark navy scheme
- [ ] App can be "installed" as a PWA

## Out of Scope

- Service worker caching (handled by service-worker spec)
- Splash screens
