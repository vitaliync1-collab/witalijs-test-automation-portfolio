import { expect, Page } from '@playwright/test';


export class CartPage {

  constructor(private page: Page) {}

  async expectCartPageIsVisible() {
    await expect(this.page.getByText('Shopping Cart')).toBeVisible();
  }
  async expectSeleniumBookInCart() {
    await expect(this.page.getByText('Selenium Cookbook')).toBeVisible();
  }
  async expectSubtotalIsCorrect() {
    await expect(this.page.getByTestId('cart-subtotal')).toHaveText('$39.99');
  }
  async proceedToCheckout() {
    await this.page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  }
}