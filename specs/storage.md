# Storage

## Overview

Create a localStorage wrapper module that persists recipe progress (current step) across sessions.

## Requirements

- [ ] `js/storage.js` ES module
- [ ] Save current step index per recipe ID to localStorage
- [ ] Load saved step index for a recipe ID
- [ ] Clear saved step for a recipe (used by reset)
- [ ] Key format: predictable, e.g., `cookbox:step:{recipeId}`
- [ ] Handle missing/corrupt data gracefully (return defaults)

## API

```js
export function saveStep(recipeId, stepIndex) { ... }
export function loadStep(recipeId) { ... }  // returns number or 0
export function clearStep(recipeId) { ... }
```

## Acceptance Criteria

- [ ] Saving and loading a step round-trips correctly
- [ ] Loading a step for an unknown recipe returns 0
- [ ] Clearing a step removes the entry
- [ ] Corrupt localStorage values don't crash the app

## Out of Scope

- Persisting ingredient check state (ephemeral by design)
- Persisting timer state
