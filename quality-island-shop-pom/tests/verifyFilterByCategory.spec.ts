import { test } from '@playwright/test';
import { ShopPage } from '../pages/ShopPage';

test('Verify filter products by category', async ({ page }) => {
  const shopPage = new ShopPage(page);
  await shopPage.open();
  await shopPage.verifyShopPageIsVisible();
  await shopPage.filterByCategoryBooks();
  await shopPage.checkFilterAndCounter();
  // Add assertions here
});