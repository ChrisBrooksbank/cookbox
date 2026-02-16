/**
 * Recipe view module for rendering recipe details and managing step state
 */

import { saveStep, loadStep, clearStep } from './storage.js';
import { createTimer } from './timer.js';

/**
 * Render a recipe detail view
 * @param {HTMLElement} container - The container element to render into
 * @param {Object} recipe - The recipe data object
 */
export function renderRecipe(container, recipe) {
    // Load saved step or default to 0
    const currentStepIndex = loadStep(recipe.id);

    // Clear container
    container.innerHTML = '';

    // Create recipe detail wrapper
    const detailDiv = document.createElement('div');
    detailDiv.className = 'recipe-detail';

    // Recipe header (title, description, meta)
    const headerDiv = document.createElement('div');
    headerDiv.className = 'recipe-header';

    const title = document.createElement('h1');
    title.textContent = recipe.title;
    headerDiv.appendChild(title);

    if (recipe.description) {
        const description = document.createElement('p');
        description.className = 'recipe-description';
        description.textContent = recipe.description;
        headerDiv.appendChild(description);
    }

    // Recipe meta (time, servings, tags)
    const metaDiv = document.createElement('div');
    metaDiv.className = 'recipe-meta';

    if (recipe.totalTime) {
        const timeSpan = document.createElement('span');
        timeSpan.textContent = `Total: ${recipe.totalTime} min`;
        metaDiv.appendChild(timeSpan);
    }

    if (recipe.servings) {
        const servingsSpan = document.createElement('span');
        servingsSpan.textContent = `Servings: ${recipe.servings}`;
        metaDiv.appendChild(servingsSpan);
    }

    headerDiv.appendChild(metaDiv);

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
        headerDiv.appendChild(tagsDiv);
    }

    detailDiv.appendChild(headerDiv);

    // Hero image
    if (recipe.image) {
        const heroImg = document.createElement('img');
        heroImg.src = recipe.image;
        heroImg.alt = recipe.title;
        heroImg.className = 'recipe-hero';
        detailDiv.appendChild(heroImg);
    }

    // Progress bar with reset button
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    const progressText = document.createElement('span');
    progressText.className = 'progress-text';
    progressText.textContent = `Step ${currentStepIndex + 1} of ${recipe.steps.length}`;
    progressBar.appendChild(progressText);

    const resetButton = document.createElement('button');
    resetButton.className = 'reset-button';
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', () => {
        if (confirm('Reset progress for this recipe? This will clear your current step.')) {
            clearStep(recipe.id);
            renderRecipe(container, recipe);
        }
    });
    progressBar.appendChild(resetButton);

    detailDiv.appendChild(progressBar);

    // Ingredients section
    const ingredientsSection = document.createElement('div');
    ingredientsSection.className = 'ingredients-section';

    const ingredientsTitle = document.createElement('h2');
    ingredientsTitle.textContent = 'Ingredients';
    ingredientsSection.appendChild(ingredientsTitle);

    const ingredientList = document.createElement('ul');
    ingredientList.className = 'ingredient-list';

    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.className = 'ingredient-item';

        if (ingredient.amount) {
            const amountSpan = document.createElement('span');
            amountSpan.className = 'ingredient-amount';
            amountSpan.textContent = ingredient.amount;
            li.appendChild(amountSpan);
        }

        const itemSpan = document.createElement('span');
        itemSpan.textContent = ingredient.item;
        li.appendChild(itemSpan);

        if (ingredient.note) {
            const noteSpan = document.createElement('span');
            noteSpan.className = 'ingredient-note';
            noteSpan.textContent = `(${ingredient.note})`;
            li.appendChild(noteSpan);
        }

        // Toggle checked state on click
        li.addEventListener('click', () => {
            li.classList.toggle('checked');
        });

        ingredientList.appendChild(li);
    });

    ingredientsSection.appendChild(ingredientList);
    detailDiv.appendChild(ingredientsSection);

    // Steps section
    const stepsSection = document.createElement('div');
    stepsSection.className = 'steps-section';

    recipe.steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        stepDiv.setAttribute('data-step-index', index);

        // Determine step state
        if (index < currentStepIndex) {
            stepDiv.classList.add('done');
        } else if (index === currentStepIndex) {
            stepDiv.classList.add('current');
        } else {
            stepDiv.classList.add('upcoming');
        }

        // Step header (title + number)
        const stepHeader = document.createElement('div');
        stepHeader.className = 'step-header';

        const stepTitle = document.createElement('h3');
        stepTitle.className = 'step-title';
        stepTitle.textContent = step.title;
        stepHeader.appendChild(stepTitle);

        const stepNumber = document.createElement('span');
        stepNumber.className = 'step-number';
        stepNumber.textContent = `Step ${index + 1}`;
        stepHeader.appendChild(stepNumber);

        stepDiv.appendChild(stepHeader);

        // Step body
        const stepBody = document.createElement('p');
        stepBody.className = 'step-body';
        stepBody.textContent = step.body;
        stepDiv.appendChild(stepBody);

        // Timer (if step has time field)
        if (step.time) {
            const timerDiv = document.createElement('div');
            timerDiv.className = 'timer';

            const timerDisplay = document.createElement('span');
            timerDisplay.className = 'timer-display';
            timerDisplay.textContent = step.time;
            timerDiv.appendChild(timerDisplay);

            const timerButton = document.createElement('button');
            timerButton.className = 'timer-button';
            timerButton.textContent = 'Start Timer';
            timerDiv.appendChild(timerButton);

            // Create timer instance
            const timer = createTimer(
                step.time,
                (_remainingSeconds, formattedTime) => {
                    timerDisplay.textContent = formattedTime;
                },
                () => {
                    timerDiv.classList.add('complete');
                    timerButton.textContent = 'Done';
                    timerButton.disabled = true;
                }
            );

            // Start button click handler
            timerButton.addEventListener('click', () => {
                if (timer.getState() === 'idle') {
                    timer.start();
                    timerDiv.classList.add('running');
                    timerButton.textContent = 'Running';
                    timerButton.disabled = true;
                }
            });

            stepDiv.appendChild(timerDiv);
        }

        // Click handler to set current step
        stepDiv.addEventListener('click', e => {
            // Don't trigger if clicking on timer button
            if (e.target.tagName === 'BUTTON') {
                return;
            }

            // Update step state
            saveStep(recipe.id, index);

            // Re-render all steps
            const allSteps = stepsSection.querySelectorAll('.step');
            allSteps.forEach((s, i) => {
                s.classList.remove('done', 'current', 'upcoming');
                if (i < index) {
                    s.classList.add('done');
                } else if (i === index) {
                    s.classList.add('current');
                } else {
                    s.classList.add('upcoming');
                }
            });

            // Update progress bar
            progressText.textContent = `Step ${index + 1} of ${recipe.steps.length}`;
        });

        stepsSection.appendChild(stepDiv);
    });

    detailDiv.appendChild(stepsSection);

    // Append to container
    container.appendChild(detailDiv);

    // Scroll current step into view
    const currentStepElement = stepsSection.querySelector('.step.current');
    if (currentStepElement) {
        setTimeout(() => {
            currentStepElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, 100);
    }

    // Keyboard navigation (arrow keys)
    const handleKeydown = e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();

            const currentIndex = loadStep(recipe.id);
            let newIndex = currentIndex;

            if (e.key === 'ArrowUp' && currentIndex > 0) {
                newIndex = currentIndex - 1;
            } else if (e.key === 'ArrowDown' && currentIndex < recipe.steps.length - 1) {
                newIndex = currentIndex + 1;
            }

            if (newIndex !== currentIndex) {
                saveStep(recipe.id, newIndex);

                // Update UI
                const allSteps = stepsSection.querySelectorAll('.step');
                allSteps.forEach((s, i) => {
                    s.classList.remove('done', 'current', 'upcoming');
                    if (i < newIndex) {
                        s.classList.add('done');
                    } else if (i === newIndex) {
                        s.classList.add('current');
                    } else {
                        s.classList.add('upcoming');
                    }
                });

                // Update progress bar
                progressText.textContent = `Step ${newIndex + 1} of ${recipe.steps.length}`;

                // Scroll to new current step
                const newCurrentStep = stepsSection.querySelector('.step.current');
                if (newCurrentStep) {
                    newCurrentStep.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
            }
        }
    };

    // Add keyboard listener
    document.addEventListener('keydown', handleKeydown);

    // Clean up keyboard listener when rendering a new recipe
    container.setAttribute('data-cleanup', 'keydown');
    container.cleanup = () => {
        document.removeEventListener('keydown', handleKeydown);
    };
}
