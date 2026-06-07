import { expect, Page } from '@playwright/test';


export class ShopPage {

  constructor(private page: Page) {}


  async open() {
    await this.page.goto('https://quality-arena-labs.base44.app/shop');
  }

  async verifyShopPageIsVisible() {
    await expect(
      this.page.getByText('Quality Island Shop')
    ).toBeVisible();
  }

  async scrollToCookbook() {
    await this.page.getByText('Selenium Cookbook').scrollIntoViewIfNeeded();
  }

  async verifyCookbookDetails() {
      await expect(this.page.getByText('Selenium Cookbook')).toBeVisible();
      await expect(this.page.getByText('$39.99')).toBeVisible();
    }

  async buyCookbook() {
      await  this.page.getByTestId('btn-add-to-cart-6a0f69aedc3432efc3e8cb0b').click();
;
  }
  async openCart() {
    await this.page.getByTestId('btn-shop-cart').click();
  }
}