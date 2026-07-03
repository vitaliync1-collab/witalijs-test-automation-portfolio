import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/ShopPage';
import { CartPage } from '../pages/CartPage';

test('Verify removing product from cart', async ({ page }) => {
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);

    await shopPage.open();
    await shopPage.verifyShopPageIsVisible();
    await shopPage.buyCookbook();
    await shopPage.openCart();
    await cartPage.expectCartPageIsVisible();
    await cartPage.expectSeleniumBookInCart();
    await cartPage.removeProductFromCart();
    await cartPage.expectCartIsEmpty();
} );