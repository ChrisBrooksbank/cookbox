# Recipe Data

## Overview

Create the recipe JSON data files including the mushroom risotto recipe and the recipe catalog index.

## Requirements

- [ ] `recipes/index.json` - catalog listing all available recipes
- [ ] `recipes/mushroom-risotto.json` - full recipe with all fields
- [ ] Recipe sourced from loveandlemons.com mushroom risotto, embellished where helpful
- [ ] Recipe image in `recipes/images/mushroom-risotto.jpg`
- [ ] JSON format matches the schema in PLAN.md:
    - `id`, `title`, `description`, `image`
    - `prepTime`, `cookTime`, `totalTime`, `servings`
    - `tags` array (meal type + diet + effort/time)
    - `ingredients` array with `amount`, `item`, optional `note`
    - `steps` array with `title`, `body`, optional `time`

## Data Details

The mushroom risotto should have:

- ~12 ingredients
- 4 steps with descriptive bodies
- At least 2 steps with `time` fields for timer functionality
- Tags: `["dinner", "vegetarian", "comfort food", "45 min"]`

The `recipes/index.json` should list recipe IDs:

```json
["mushroom-risotto"]
```

## Acceptance Criteria

- [ ] `recipes/index.json` is valid JSON array of recipe IDs
- [ ] `recipes/mushroom-risotto.json` is valid JSON matching the schema
- [ ] All required fields are present
- [ ] Steps with timing have a `time` field (e.g., "8 min")
- [ ] Image file exists at the referenced path

## Out of Scope

- Recipe import from URLs (future feature)
- Additional recipes beyond mushroom risotto
