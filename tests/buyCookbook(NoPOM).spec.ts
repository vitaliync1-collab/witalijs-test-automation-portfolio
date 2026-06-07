import { test, expect } from '@playwright/test';

test('prosty proces zakupowy w sklepie', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/shop');

  await expect(page.getByText('Quality Island Shop')).toBeVisible();

  await page.getByText('Selenium Cookbook').scrollIntoViewIfNeeded();

  await expect(page.getByText('Selenium Cookbook')).toBeVisible();
  await expect(page.getByText('$39.99')).toBeVisible();

  await page.getByText('Selenium Cookbook');

 await page.getByTestId('btn-add-to-cart-6a0f69aedc3432efc3e8cb0b').click();

  await page.getByTestId('btn-shop-cart').click();

  await expect(page.getByText('Shopping Cart')).toBeVisible();
  await expect(page.getByText('Selenium Cookbook')).toBeVisible();
  await expect(page.getByTestId('cart-subtotal')).toHaveText('$39.99');

  await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

  await expect(page.getByText('Checkout')).toBeVisible();

  await page.getByLabel('Full Name').fill('Jan Kowalski');
  await page.getByLabel('Street Address').fill('ul. Testowa 1');
  await page.getByLabel('City').fill('Warsaw');
  await page.getByLabel('ZIP Code').fill('00-001');

  await expect(page.getByLabel('Full Name')).toHaveValue('Jan Kowalski');
  await expect(page.getByLabel('Street Address')).toHaveValue('ul. Testowa 1');
  await expect(page.getByLabel('City')).toHaveValue('Warsaw');
  await expect(page.getByLabel('ZIP Code')).toHaveValue('00-001');

await page.getByText('Express Delivery').click();
 
await page.getByRole('button', { name: /Place Order/i }).click();

await expect(page.getByTestId('confirmation-title')).toHaveText('Order Confirmed!');
});