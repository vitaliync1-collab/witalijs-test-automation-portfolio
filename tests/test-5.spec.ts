import { test, expect } from '@playwright/test';


test('Submit Form button is visible and clickable', async ({ page }) => {
     await page.goto('https://quality-arena-labs.base44.app/practice/forms');

    const submitButton = page.getByTestId('btn-form-submit');

    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();

    await submitButton.click();

    await expect(page).toHaveTitle(/Practice Forms|Quality Island Arena/i);
  });