import { test, expect } from '@playwright/test';



test('fill and clear Personal Information form fields', async ({ page }) => {

  // Open the Personal Information form page.
  await page.goto('https://quality-arena-labs.base44.app/challenges/forms');

  // Check that the Personal Information section is visible.
  await expect(page.getByText('Personal Information')).toBeVisible();

  // Enter first and last name into the Full Name field.
  await page.getByTestId('ch-input-full-name').fill('Anna Kowalska');

  // Enter email address into the Email Address field.
  await page.getByTestId('ch-input-email').fill('anna@example.com');

  // Enter phone number into the Phone Number field.
  await page.getByTestId('ch-input-phone').fill('+48 123 456 789');

  // Enter company name into the Current Company field.
  await page.getByTestId('ch-input-company').fill('Quality Island');

  // Verify the Full Name field contains the entered value.
  await expect(
    page.getByTestId('ch-input-full-name')
  ).toHaveValue('Anna Kowalska');

  // Verify the Email Address field contains the entered value.
  await expect(
    page.getByTestId('ch-input-email')
  ).toHaveValue('anna@example.com');

  // Verify the Phone Number field contains the entered value.
  await expect(
    page.getByTestId('ch-input-phone')
  ).toHaveValue('+48 123 456 789');

  // Verify the Current Company field contains the entered value.
  await expect(
    page.getByTestId('ch-input-company')
  ).toHaveValue('Quality Island');

  // Clear the Full Name field.
  await page.getByTestId('ch-input-full-name').clear();

  // Clear the Email Address field.
  await page.getByTestId('ch-input-email').clear();

  // Clear the Phone Number field.
  await page.getByTestId('ch-input-phone').clear();

  // Clear the Current Company field.
  await page.getByTestId('ch-input-company').clear();

  // Verify the Full Name field is empty.
  await expect(
    page.getByTestId('ch-input-full-name')
  ).toHaveValue('');

  // Verify the Email Address field is empty.
  await expect(
    page.getByTestId('ch-input-email')
  ).toHaveValue('');

  // Verify the Phone Number field is empty.
  await expect(
    page.getByTestId('ch-input-phone')
  ).toHaveValue('');

  // Verify the Current Company field is empty.
  await expect(
    page.getByTestId('ch-input-company')
  ).toHaveValue('');
  // There is a chance to clear the whole section with all clear



});