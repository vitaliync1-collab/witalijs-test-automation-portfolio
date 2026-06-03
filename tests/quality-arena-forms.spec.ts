import { test, expect } from '@playwright/test';


test('wartosci wpisane do pol sa poprawne', async ({ page }) => {
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

  await expect(page.getByTestId('input-name')).toHaveValue('Jan Kowalski');
  await expect(page.getByTestId('input-email')).toHaveValue('test@test.pl');
  await expect(page.getByTestId('input-password')).toHaveValue('admin');
  await expect(page.getByTestId('input-search')).toHaveValue('produkt');
  await expect(page.getByTestId('input-textarea')).toHaveValue('to jest moja wiadomosc');
  await expect(page).toHaveTitle(/Practice Forms/);
  
});

test('checkbox Selenium można zaznaczyć', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/practice/forms');

  await expect(page.getByTestId('section-checkboxes')).toBeVisible();

  const seleniumCheckbox = page.getByTestId('checkbox-selenium');

  await expect(seleniumCheckbox).not.toBeChecked();

  await seleniumCheckbox.check();

  await expect(seleniumCheckbox).toBeChecked();

  await seleniumCheckbox.uncheck();

  await expect(seleniumCheckbox).not.toBeChecked();


});

test('radio button pozwala wybrać tylko jedną opcję z grupy', async ({ page }) => {
     await page.goto('https://quality-arena-labs.base44.app/practice/forms');

    const juniorRadio = page.getByTestId('radio-junior-qa');
    const seniorRadio = page.getByTestId('radio-senior-qa');
    const leadRadio = page.getByTestId('radio-qa-lead');

    await juniorRadio.check();
    await expect(juniorRadio).toBeChecked();
     await expect(leadRadio).not.toBeChecked();
     await expect(seniorRadio).not.toBeChecked();

    await seniorRadio.check();
    await expect(seniorRadio).toBeChecked();
    await expect(juniorRadio).not.toBeChecked();
    await expect(leadRadio).not.toBeChecked();

    await leadRadio.check();
    await expect(leadRadio).toBeChecked();
    await expect(seniorRadio).not.toBeChecked();
    await expect(juniorRadio).not.toBeChecked();
  });