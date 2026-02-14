/**
 * Storage module for persisting recipe progress in localStorage
 */

const KEY_PREFIX = 'cookbox:step:';

/**
 * Save the current step index for a recipe
 * @param {string} recipeId - The recipe identifier
 * @param {number} stepIndex - The current step index (0-based)
 */
export function saveStep(recipeId, stepIndex) {
    try {
        const key = `${KEY_PREFIX}${recipeId}`;
        localStorage.setItem(key, String(stepIndex));
    } catch (_error) {
        // Fail silently if localStorage is unavailable (private browsing, quota exceeded)
    }
}

/**
 * Load the saved step index for a recipe
 * @param {string} recipeId - The recipe identifier
 * @returns {number} The saved step index, or 0 if not found or invalid
 */
export function loadStep(recipeId) {
    try {
        const key = `${KEY_PREFIX}${recipeId}`;
        const value = localStorage.getItem(key);

        if (value === null) {
            return 0;
        }

        const parsed = parseInt(value, 10);
        return Number.isNaN(parsed) ? 0 : parsed;
    } catch (_error) {
        // Return default if localStorage is unavailable or data is corrupt
        return 0;
    }
}

/**
 * Clear the saved step for a recipe
 * @param {string} recipeId - The recipe identifier
 */
export function clearStep(recipeId) {
    try {
        const key = `${KEY_PREFIX}${recipeId}`;
        localStorage.removeItem(key);
    } catch (_error) {
        // Fail silently if localStorage is unavailable
    }
}
