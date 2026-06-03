import { test, expect } from '@playwright/test';


//test('przycisk Submit Form jest widoczny i klikalny', async ({ page }) => {
     //await page.goto('https://quality-arena-labs.base44.app/practice/interactions');

    //const hoverButton
     //= page.getByTestId('hover-tooltip-trigger');

    //await expect(hoverButton).toBeVisible();
   //hoverButton.hover();

  //await expect(page.getByText('You found the tooltip!')).toBeVisible();
    
  //});

test('tooltip pojawia się po najechaniu na przycisk', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/practice/interactions');

  const hoverButton = page.getByTestId('hover-reveal-trigger');
  const tooltip = page.getByTestId('hover-tooltip');

  await expect(hoverButton).toBeVisible();

  await hoverButton.hover();

  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText('You found the tooltip!');
});