import { test, expect } from '@playwright/test';



test('modal pojawia się po kliknięciu przycisku', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/practice/interactions');

  const openModalButton = page.getByTestId('btn-open-modal');
  const modalConfirmButton = page.getByTestId('modal-confirm-btn');
  const modalCancelButton = page.getByTestId('modal-cancel-btn');
  const modalCloseButton = page.getByTestId('modal-close-btn');
  const modal = page.getByTestId('modal-title');

  await expect(openModalButton).toBeVisible();
  await openModalButton.click();
  await expect(modalConfirmButton).toBeVisible();
  await expect(modalCancelButton).toBeVisible();
  await expect(modalCloseButton).toBeVisible();
  await modalCloseButton.click();
  await expect(modalConfirmButton).not.toBeVisible();
  await expect(modalCancelButton).not.toBeVisible();
  await expect(modalCloseButton).not.toBeVisible();
  await expect(modal).not.toBeVisible();

});