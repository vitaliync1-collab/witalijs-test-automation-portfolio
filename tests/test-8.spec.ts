import { test, expect } from '@playwright/test';



test('Success Toast displayed after clicking the success button', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/practice/interactions');

  await page.getByTestId('btn-toast-success').click();

  await expect(page.getByText('Operation completed successfully!')).toBeVisible();
});


test('Error Toast displayed after clicking the error button', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/practice/interactions');

  await page.getByTestId('btn-toast-error').click();

  await expect(page.getByText('An error occurred, please try again.')).toBeVisible();
});


test('Info Toast displayed after clicking the info button', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/practice/interactions');

  await page.getByTestId('btn-toast-info').click();

  await expect(page.getByText('New update available.')).toBeVisible();
});