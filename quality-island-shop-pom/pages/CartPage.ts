import { expect, Page } from '@playwright/test';


export class CartPage {

  constructor(private page: Page) { }

  async expectCartPageIsVisible() {
    await expect(this.page.getByText('Shopping Cart')).toBeVisible();
  }
  async expectSeleniumBookInCart() {
    await expect(this.page.getByText('Selenium Cookbook')).toBeVisible();
  }

  async getCookbookQuantity(): Promise<number> {
    const cartItem = this.page.locator('.section-card').filter({
      hasText: 'Selenium Cookbook',
    });

    const quantity = await cartItem
      .locator('[data-quantity]')
      .getAttribute('data-quantity');

    return Number(quantity);
  }

  async getCartTotal(): Promise<number> {
  const totalText = await this.page
    .getByTestId('cart-total')
    .textContent();

  return Number(totalText?.replace('$', '').trim());
}

  async expectSubtotalIsCorrect() {
    await expect(this.page.getByTestId('cart-subtotal')).toHaveText('$39.99');
  }
  async proceedToCheckout() {
    await this.page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  }

  async removeProductFromCart() {
    await this.page.getByTestId('btn-remove-cart-item-1').click();
  }

  async expectCartIsEmpty() {
    await expect(this.page.getByText('Your cart is empty')).toBeVisible();
  }
  async getSubtotal(): Promise<number> {
  const subtotalText = await this.page
    .getByTestId('cart-subtotal')
    .textContent();

  return Number(subtotalText?.replace('$', '').trim());
}

async getShippingCost(): Promise<number> {
  const shippingText = await this.page
    .getByTestId('cart-shipping')
    .textContent();

  return Number(shippingText?.replace('$', '').trim());
}

}