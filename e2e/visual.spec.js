import { test, expect } from '@playwright/test';

test.describe('Visual regression', () => {
    test('homepage matches screenshot', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('homepage.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.01,
        });
    });

    // Add additional pages/routes as needed:
    // test('recipe detail matches screenshot', async ({ page }) => {
    //     await page.goto('/#mushroom-risotto');
    //     await page.waitForLoadState('networkidle');
    //     await expect(page).toHaveScreenshot('mushroom-risotto.png', {
    //         fullPage: true,
    //         maxDiffPixelRatio: 0.01,
    //     });
    // });
});
