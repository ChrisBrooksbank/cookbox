# Timers

## Overview

Create countdown timer logic with audio chime alerts using the Web Audio API.

## Requirements

- [ ] `js/timer.js` ES module
- [ ] Parse time strings like "8 min" into seconds
- [ ] Countdown timer that ticks every second
- [ ] Timer state: idle, running, finished
- [ ] Audio chime on completion using Web Audio API (no external audio files)
- [ ] Visual flash/pulse on completion (CSS class toggle)
- [ ] Timer can be started by tapping the time element
- [ ] Timer displays remaining time in mm:ss format
- [ ] Multiple timers can run simultaneously (one per step)

## API

```js
export function createTimer(seconds, onTick, onComplete) { ... }
export function playChime() { ... }
```

## Acceptance Criteria

- [ ] Tapping a step's time starts a countdown
- [ ] Countdown displays correctly (mm:ss format)
- [ ] Chime plays when timer reaches zero
- [ ] Visual flash/highlight appears on completion
- [ ] Timer works correctly for various durations

## Out of Scope

- Pause/resume functionality
- Timer persistence across page loads
- Vibration alerts
