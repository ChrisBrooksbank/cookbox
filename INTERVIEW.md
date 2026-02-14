# Cookbox - Requirements Interview

*Conducted 2026-02-14*

---

## Recipe Content

**Q: Do you have the actual mushroom risotto recipe, or should I write one?**

A: Extract it from https://www.loveandlemons.com/mushroom-risotto/. Create a JSON data file based on that. Feel free to embellish where helpful. Including at least one image would be great.

**Result:** Recipe extracted successfully - 4 steps, ~12 ingredients, 45 min total. Will be stored as `recipes/mushroom-risotto.json`. An image will be sourced and included.

---

## Timers

**Q: Steps have a 'time' field. Should the app have an actual countdown timer, or is time just informational?**

A: **Tap-to-start timer.** Tapping the time starts a visible countdown with an alert when done.

**Implications:** Each step with a `time` field gets a tappable timer element. Timer state is visual (countdown display within the step). Timer completion triggers a visual flash + audio chime.

---

## Ingredients

**Q: Should ingredients be interactive? e.g., tap to check them off as you prep?**

A: **Yes, checkable.** Tap ingredients to strike them through as you gather them.

**Implications:** Ingredients get tap-to-toggle behavior with strikethrough styling. Checked state does NOT need to persist to localStorage (reset on page load is fine - ingredient checking is ephemeral prep-time behavior, unlike step tracking).

---

## Reset Progress

**Q: Should there be a 'Reset progress' button to start a recipe over?**

A: **Yes, with confirmation.** Reset button that asks "Are you sure?" before clearing.

**Implications:** Reset button in the recipe header area. Triggers a confirm dialog. Clears the saved step for that recipe from localStorage and resets all steps to upcoming state.

---

## Tags

**Q: What kind of tags matter to you on recipe cards?**

A: **Both meal type/diet AND effort/time.** e.g., dinner, vegetarian, easy, 45 min.

**Implications:** Recipe JSON gets a `tags` array with mixed tag types. Cards display them as small pills/chips. Tags are display-only for now (no filtering in v1, but the data supports it later).

---

## Adding Recipes (Future)

**Q: How do you picture adding recipes in the future?**

A: **Import from URLs.** Paste a recipe URL and have the app parse it.

**Implications:** Not in v1 scope, but influences data design. Recipe JSON format should be comprehensive enough to capture what URL parsers would extract (structured-data/JSON-LD from recipe sites). For now, recipes are added as JSON files manually.

---

## Images

**Q: Where should recipe images appear?**

A: **Card + hero.** Thumbnail on the recipe list card AND large image at the top of the recipe detail page.

**Implications:** Recipe JSON gets an `image` field (path to image file). List view shows it as a card thumbnail. Detail view shows it as a hero banner below the title. Images stored in a `recipes/images/` directory.

---

## App Name

**Q: Should the app be called 'Cookbox' or something else?**

A: **Cookbox.** Keep the name.

---

## Color Scheme

**Q: Dark color scheme preferences?**

A: **Navy + gold/green.** Keep the planned dark warm palette - navy background, gold accent for current step, green for done.

---

## Timer Alerts

**Q: What should happen when a step timer finishes?**

A: **Visual + sound.** Play a short chime/beep when the timer completes, plus a visual flash/highlight.

**Implications:** Need a small audio file or use the Web Audio API to generate a chime tone. Visual alert = flash or pulse animation on the step. No vibration needed.

---

## Offline Strategy

**Q: Should the PWA work fully offline from first install, or cache on use?**

A: **Cache on use.** Cache recipes as you view them - offline works for visited recipes only.

**Implications:** Service worker uses a cache-on-use strategy rather than pre-caching all recipes. The app shell (HTML, CSS, JS) is still pre-cached on install. Recipe JSON and images are cached when first fetched. This keeps initial install lightweight and scales better as recipes grow.

---

## Anything Else

**Q: Anything I haven't asked about for v1?**

A: **Nope, that covers it.**

---

## Summary of Decisions

| Feature | Decision |
|---|---|
| Recipe source | Extract from loveandlemons.com, embellish as needed |
| Images | Card thumbnails + hero banners |
| Timers | Tap-to-start countdown per step |
| Timer alerts | Visual flash + audio chime |
| Ingredients | Tappable with strikethrough (ephemeral, no persist) |
| Reset | Button with confirm dialog |
| Tags | Meal type + diet + effort/time |
| Colors | Navy background, gold current, green done |
| Offline | Cache-on-use (app shell pre-cached, recipes cached when viewed) |
| Future recipes | URL import (not v1); JSON files for now |
| App name | Cookbox |
