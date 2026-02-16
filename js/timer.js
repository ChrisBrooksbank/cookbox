/**
 * Timer module for countdown timers with audio chimes
 */

/**
 * Parse a time string like "8 min" or "30 sec" into seconds
 * @param {string} timeString - Time string to parse (e.g., "8 min", "30 sec", "1 hr")
 * @returns {number} Time in seconds
 */
function parseTimeString(timeString) {
    const match = timeString.match(/(\d+)\s*(min|sec|hr)/i);
    if (!match) {
        return 0;
    }

    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    switch (unit) {
        case 'hr':
            return value * 3600;
        case 'min':
            return value * 60;
        case 'sec':
            return value;
        default:
            return 0;
    }
}

/**
 * Format seconds into mm:ss format
 * @param {number} seconds - Seconds to format
 * @returns {string} Formatted time string (mm:ss)
 */
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Play an audio chime using Web Audio API
 */
export function playChime() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Pleasant chime sound (A4 note = 440 Hz)
        oscillator.frequency.value = 440;
        oscillator.type = 'sine';

        // Fade out envelope
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (_error) {
        // Fail silently if Web Audio API is unavailable
    }
}

/**
 * Create a countdown timer
 * @param {string|number} duration - Duration in seconds, or a time string like "8 min"
 * @param {Function} onTick - Callback called every second with remaining seconds and formatted time
 * @param {Function} onComplete - Callback called when timer reaches zero
 * @returns {Object} Timer control object with start, stop, and getRemaining methods
 */
export function createTimer(duration, onTick, onComplete) {
    const totalSeconds = typeof duration === 'string' ? parseTimeString(duration) : duration;
    let remainingSeconds = totalSeconds;
    let intervalId = null;
    let state = 'idle'; // 'idle', 'running', 'finished'

    return {
        /**
         * Start the timer countdown
         */
        start() {
            if (state === 'running' || state === 'finished') {
                return;
            }

            state = 'running';

            // Initial tick
            onTick(remainingSeconds, formatTime(remainingSeconds));

            intervalId = setInterval(() => {
                remainingSeconds -= 1;

                if (remainingSeconds <= 0) {
                    remainingSeconds = 0;
                    state = 'finished';
                    clearInterval(intervalId);
                    onTick(0, formatTime(0));
                    playChime();
                    onComplete();
                } else {
                    onTick(remainingSeconds, formatTime(remainingSeconds));
                }
            }, 1000);
        },

        /**
         * Stop the timer
         */
        stop() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            state = 'idle';
        },

        /**
         * Get remaining seconds
         * @returns {number} Remaining seconds
         */
        getRemaining() {
            return remainingSeconds;
        },

        /**
         * Get timer state
         * @returns {string} Current state ('idle', 'running', 'finished')
         */
        getState() {
            return state;
        },
    };
}
