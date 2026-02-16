# App Shell

## Overview

Create the single-page HTML structure and dark-theme CSS that serves as the foundation for all views.

## Requirements

- [ ] `index.html` with semantic HTML structure (header, main, nav)
- [ ] Single-page app shell that hosts both list and detail views
- [ ] `css/style.css` with dark warm color scheme
- [ ] Navy background (#1a1a2e), gold accent (#e2b714), green done (#4ade80)
- [ ] Base font size 18px, line height 1.6
- [ ] Large tap targets (minimum 44px)
- [ ] No decorative animations
- [ ] Mobile-first responsive layout
- [ ] Mobile (<768px): single column
- [ ] Desktop (>768px): two-column grid for recipe detail (sticky ingredients sidebar + steps)
- [ ] SVG favicon in `icons/favicon.svg`

## Acceptance Criteria

- [ ] Page loads with dark theme, no flash of unstyled content
- [ ] Responsive breakpoint works at 768px
- [ ] Text is readable (18px base, high contrast on dark background)
- [ ] No horizontal scroll on mobile viewports

## Out of Scope

- JavaScript functionality (handled by other specs)
- Recipe data rendering (handled by recipe-view spec)
- PWA manifest and icons (handled by pwa-manifest spec)
