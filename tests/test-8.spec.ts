import { test, expect } from '@playwright/test';



test('po kliknięciu Success Toast pojawia się komunikat sukcesu', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/practice/interactions');

  await page.getByTestId('btn-toast-success').click();

  await expect(page.getByText('Operation completed successfully!')).toBeVisible();
});


test('po kliknięciu Error Toast pojawia się komunikat błędu', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/practice/interactions');

  await page.getByTestId('btn-toast-error').click();

  await expect(page.getByText('An error occurred, please try again.')).toBeVisible();
});


test('po kliknięciu Info Toast pojawia się komunikat informacyjny', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/practice/interactions');

  await page.getByTestId('btn-toast-info').click();

  await expect(page.getByText('New update available.')).toBeVisible();
});