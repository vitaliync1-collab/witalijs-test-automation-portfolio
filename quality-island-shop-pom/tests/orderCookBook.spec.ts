import { test } from '@playwright/test';

// Importujemy Page Object dla strony sklepu.
import { ShopPage } from '../pages/ShopPage';

// Importujemy Page Object dla koszyka.
import { CartPage } from '../pages/CartPage';

// Importujemy Page Object dla checkoutu.
import { CheckoutPage } from '../pages/CheckoutPage';

// Importujemy Page Object dla strony potwierdzenia zamówienia.
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';

test('prosty proces zakupowy w sklepie - Page Object Model', async ({ page }) => {

  const shopPage = new ShopPage(page);

  const cartPage = new CartPage(page);

  const checkoutPage = new CheckoutPage(page);

  const orderConfirmationPage = new OrderConfirmationPage(page);

  await shopPage.open();
  await shopPage.verifyShopPageIsVisible();
  await shopPage.scrollToCookbook();
  await shopPage.verifyCookbookDetails();
  //shopPage.addSelenium();
  //shopPage.openCart();

 // cartPage.expectCartPageIsVisible();
 // cartPage.expectSeleniumBookInCart();
  //cartPage.expectSubtotalIsCorrect();
  //cartPage.proceedToCheckout();

});