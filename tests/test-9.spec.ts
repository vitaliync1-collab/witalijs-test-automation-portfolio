import { test, expect } from '@playwright/test';



test('Zakup i weryfikacja', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/shop');

  await expect(page.getByTestId('shop-title')).toBeVisible();

  const product1Name = page.getByTestId('product-name-8');
  const product1Price = page.getByTestId('product-price-8');
  const addToCartproduct1Button = page.getByTestId('btn-add-to-cart-8');
  const cartButton = page.getByTestId('btn-shop-cart');
  const cartSubtotal = page.getByTestId('cart-subtotal');
  const cartItems = page.getByTestId('cart-items-list');

  await expect(product1Name).toBeVisible();
  await expect(product1Price).toBeVisible();
  await expect(addToCartproduct1Button).toBeVisible();

  // expect Product 1 to have name "Selenium WebDriver Cookbook" and price "$39.99"
  await expect(product1Name).toHaveText('Selenium WebDriver Cookbook');
  await expect(product1Price).toHaveText('$39.99');
  await addToCartproduct1Button.click();
  await cartButton.click();
  await expect(cartSubtotal).toBeVisible();
  await expect(cartSubtotal).toHaveText('$39.99');
  await expect(cartItems).toBeVisible();
  await expect(cartItems).toHaveText('Selenium WebDriver Cookbook');

});


