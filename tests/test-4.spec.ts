import { test, expect } from '@playwright/test';

test('uzytkownik moze zaladowac plik qaboard', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/practice/forms');

  const fileDropZone = page.getByTestId('file-drop-zone');
  const fileInput = page.getByTestId('input-file');

  await fileDropZone.scrollIntoViewIfNeeded();

  await fileInput.setInputFiles('test-data/file.txt');

  const uploadedFileName = await fileInput.evaluate((input) => {
    const fileInput = input as HTMLInputElement;
    return fileInput.files?.[0]?.name;
  });

  expect(uploadedFileName).toBe('file.txt');
});