import { test, expect } from '@playwright/test';



test('uzupelnienie i wyczyszczenie pol formularza Personal Information', async ({ page }) => {

  // Otwieramy stronę z formularzem Personal Information.
  await page.goto('https://quality-arena-labs.base44.app/challenges/forms');

  // Sprawdzamy, czy na stronie widoczna jest sekcja Personal Information.
  await expect(page.getByText('Personal Information')).toBeVisible();

  // Wpisujemy imię i nazwisko do pola Full Name.
  await page.getByTestId('ch-input-full-name').fill('Anna Kowalska');

  // Wpisujemy adres email do pola Email Address.
  await page.getByTestId('ch-input-email').fill('anna@example.com');

  // Wpisujemy numer telefonu do pola Phone Number.
  await page.getByTestId('ch-input-phone').fill('+48 123 456 789');

  // Wpisujemy nazwę firmy do pola Current Company.
  await page.getByTestId('ch-input-company').fill('Quality Island');

  // Sprawdzamy, czy pole Full Name zawiera wpisaną wartość.
  await expect(
    page.getByTestId('ch-input-full-name')
  ).toHaveValue('Anna Kowalska');

  // Sprawdzamy, czy pole Email Address zawiera wpisaną wartość.
  await expect(
    page.getByTestId('ch-input-email')
  ).toHaveValue('anna@example.com');

  // Sprawdzamy, czy pole Phone Number zawiera wpisaną wartość.
  await expect(
    page.getByTestId('ch-input-phone')
  ).toHaveValue('+48 123 456 789');

  // Sprawdzamy, czy pole Current Company zawiera wpisaną wartość.
  await expect(
    page.getByTestId('ch-input-company')
  ).toHaveValue('Quality Island');

  // Czyścimy pole Full Name.
  await page.getByTestId('ch-input-full-name').clear();

  // Czyścimy pole Email Address.
  await page.getByTestId('ch-input-email').clear();

  // Czyścimy pole Phone Number.
  await page.getByTestId('ch-input-phone').clear();

  // Czyścimy pole Current Company.
  await page.getByTestId('ch-input-company').clear();

  // Sprawdzamy, czy pole Full Name jest puste.
  await expect(
    page.getByTestId('ch-input-full-name')
  ).toHaveValue('');

  // Sprawdzamy, czy pole Email Address jest puste.
  await expect(
    page.getByTestId('ch-input-email')
  ).toHaveValue('');

  // Sprawdzamy, czy pole Phone Number jest puste.
  await expect(
    page.getByTestId('ch-input-phone')
  ).toHaveValue('');

  // Sprawdzamy, czy pole Current Company jest puste.
  await expect(
    page.getByTestId('ch-input-company')
  ).toHaveValue('');
  // jest szansa wyczyscic cala sekcje z all clear



});