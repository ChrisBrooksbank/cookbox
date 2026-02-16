/**
 * App entry point: routing, recipe loading, and service worker registration
 */

import { renderRecipe } from './recipe-view.js';

/**
 * Load and render the recipe list view
 */
async function showRecipeList() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    try {
        // Fetch recipe catalog
        const response = await fetch('recipes/index.json');
        if (!response.ok) {
            throw new Error('Failed to load recipe catalog');
        }

        const recipeIds = await response.json();

        // Fetch metadata for each recipe
        const recipePromises = recipeIds.map(async id => {
            const recipeResponse = await fetch(`recipes/${id}.json`);
            if (!recipeResponse.ok) {
                return null;
            }
            return recipeResponse.json();
        });

        const recipes = (await Promise.all(recipePromises)).filter(r => r !== null);

        // Render recipe list
        const listDiv = document.createElement('div');
        listDiv.className = 'recipe-list';

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');

            // Recipe image
            if (recipe.image) {
                const img = document.createElement('img');
                img.src = recipe.image;
                img.alt = recipe.title;
                card.appendChild(img);
            }

            // Card content
            const content = document.createElement('div');
            content.className = 'recipe-card-content';

            const title = document.createElement('h2');
            title.textContent = recipe.title;
            content.appendChild(title);

            // Tags
            if (recipe.tags && recipe.tags.length > 0) {
                const tagsDiv = document.createElement('div');
                tagsDiv.className = 'recipe-card-tags';
                recipe.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'recipe-card-tag';
                    tagSpan.textContent = tag;
                    tagsDiv.appendChild(tagSpan);
                });
                content.appendChild(tagsDiv);
            }

            // Total time
            if (recipe.totalTime) {
                const timeDiv = document.createElement('div');
                timeDiv.className = 'recipe-card-time';
                timeDiv.textContent = `Total time: ${recipe.totalTime} min`;
                content.appendChild(timeDiv);
            }

            card.appendChild(content);

            // Click handler to navigate to recipe detail
            const navigateToRecipe = () => {
                window.location.hash = `#${recipe.id}`;
            };

            card.addEventListener('click', navigateToRecipe);
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigateToRecipe();
                }
            });

            listDiv.appendChild(card);
        });

        main.appendChild(listDiv);
    } catch (error) {
        main.innerHTML = `<p>Error loading recipes: ${error.message}</p>`;
    }
}

/**
 * Load and render a specific recipe detail view
 * @param {string} recipeId - The recipe ID to load
 */
async function showRecipeDetail(recipeId) {
    const main = document.querySelector('main');
    main.innerHTML = '';

    // Clean up previous keyboard listener if exists
    if (main.cleanup) {
        main.cleanup();
    }

    try {
        const response = await fetch(`recipes/${recipeId}.json`);
        if (!response.ok) {
            throw new Error('Recipe not found');
        }

        const recipe = await response.json();
        renderRecipe(main, recipe);
    } catch (error) {
        main.innerHTML = `<p>Error loading recipe: ${error.message}</p>`;
    }
}

/**
 * Route based on current hash
 */
function route() {
    const hash = window.location.hash.slice(1); // Remove leading '#'

    if (hash) {
        // Show recipe detail
        showRecipeDetail(hash);
    } else {
        // Show recipe list
        showRecipeList();
    }
}

/**
 * Initialize the app
 */
function init() {
    // Listen for hash changes (back/forward navigation)
    window.addEventListener('hashchange', route);

    // Initial route
    route();

    // Register service worker (will be created in Phase 5)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./sw.js')
            .then(_registration => {
                // Service worker registered successfully
            })
            .catch(_error => {
                // Service worker registration failed - sw.js not yet implemented
            });
    }
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
