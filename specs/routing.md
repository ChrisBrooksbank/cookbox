# Routing & App Entry

## Overview

Create the app entry point with hash-based routing, recipe loading, and service worker registration.

## Requirements

- [ ] `js/app.js` ES module as the entry point
- [ ] Hash-based routing: empty hash = recipe list, `#recipe-id` = recipe detail
- [ ] Listen for `hashchange` events to switch views
- [ ] Fetch recipe catalog from `recipes/index.json`
- [ ] Fetch individual recipe JSON when navigating to detail view
- [ ] Register service worker (`sw.js`) on load

### Recipe List View

- [ ] Display recipe cards with: thumbnail image, title, tags, total time
- [ ] Cards link to `#recipe-id` for navigation
- [ ] Cards are visually appealing with the dark theme

### View Transitions

- [ ] Smooth transition between list and detail views
- [ ] Back navigation (browser back button) works via hash

## Acceptance Criteria

- [ ] App loads and shows recipe list
- [ ] Clicking a recipe card navigates to detail view
- [ ] Browser back button returns to list
- [ ] Recipe data loads correctly from JSON files
- [ ] Service worker registers without errors
- [ ] No console errors on page load

## Out of Scope

- Tag filtering (future feature)
- Search functionality
- Recipe import from URLs
