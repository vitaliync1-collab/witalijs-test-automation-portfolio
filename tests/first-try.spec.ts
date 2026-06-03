import { test, expect } from '@playwright/test';


test('strona formularza otwiera się poprawnie', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/practice/forms');

  await page.getByTestId('input-name').click();
  await page.getByTestId('input-name').fill('Jan Kowalski');

  await page.getByTestId('input-email').fill('test@test.pl');

  await page.getByTestId('input-password').click();
  await page.getByTestId('input-password').fill('admin');

  await page.getByTestId('input-search').click();
  await page.getByTestId('input-search').fill('produkt');

  await page.getByTestId('input-textarea').click();
  await page.getByTestId('input-textarea').fill('to jest moja wiadomosc');

  await page.getByTestId('btn-form-submit').click();

  await expect(page).toHaveTitle(/Practice Forms/);
});
