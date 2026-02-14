# Recipe View

## Overview

Create the recipe detail view with step tracking, progress bar, checkable ingredients, timers, and reset functionality.

## Requirements

### Step Tracking

- [ ] All steps visible at once (no accordion, no pagination)
- [ ] Three visual states: done (green tint), current (gold highlight), upcoming (muted)
- [ ] Tap any step to mark it current; all prior steps become "done" automatically
- [ ] Current step saved to localStorage via storage.js
- [ ] On load, restore saved step and scroll to it

### Progress Bar

- [ ] Sticky progress bar at top of recipe view
- [ ] Shows "Step N of M"
- [ ] Visual progress indicator (filled bar)
- [ ] Updates when steps are tapped

### Checkable Ingredients

- [ ] Tap ingredient to toggle strikethrough
- [ ] Strikethrough state is ephemeral (resets on page load)
- [ ] Clear visual feedback on tap

### Timers

- [ ] Steps with `time` field show a tappable timer element
- [ ] Integrates with timer.js for countdown and chime

### Reset

- [ ] Reset button in recipe header area
- [ ] Shows confirm dialog ("Are you sure?")
- [ ] Clears localStorage step for this recipe
- [ ] Resets all steps to upcoming state
- [ ] Resets progress bar to Step 1

### Layout

- [ ] Hero image at top of detail view
- [ ] Recipe title, description, tags, time info
- [ ] Mobile: single column (hero, ingredients, steps)
- [ ] Desktop: sticky ingredients sidebar + steps column

### Keyboard Support

- [ ] Arrow keys to navigate between steps

## Acceptance Criteria

- [ ] All steps render and are tappable
- [ ] Step states visually distinct (done/current/upcoming)
- [ ] Progress bar reflects current step
- [ ] Ingredients are checkable with strikethrough
- [ ] Timer starts on tap and counts down
- [ ] Reset clears progress with confirmation
- [ ] Keyboard navigation works with arrow keys
- [ ] Layout adapts between mobile and desktop

## Out of Scope

- Recipe list view (handled by routing/app spec)
- Recipe data loading (handled by app spec)
