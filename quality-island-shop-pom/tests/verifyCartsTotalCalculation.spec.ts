import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/ShopPage';
import { CartPage } from '../pages/CartPage';

test('Verify cart total calculation', async ({ page }) => {
    const shopPage = new ShopPage(page);
    const cartPage = new CartPage(page);

    await shopPage.open();
    await shopPage.verifyShopPageIsVisible();
    await shopPage.getCookbookPrice();

    const price = await shopPage.getCookbookPrice();
    // console.log('Product price:', price);

    await shopPage.buyCookbook();
    await shopPage.buyCookbook();
    await shopPage.buyCookbook();
    await shopPage.openCart();
    await cartPage.expectCartPageIsVisible();
    expect(await cartPage.getCookbookQuantity()).toBe(3);

    expect(await cartPage.getCookbookQuantity()).toBe(3);

    const subtotal = await cartPage.getSubtotal();
    const shipping = await cartPage.getShippingCost();
    const total = await cartPage.getCartTotal();

    expect(subtotal).toBeCloseTo(price * 3, 2);
    expect(total).toBeCloseTo(subtotal + shipping, 2);



});