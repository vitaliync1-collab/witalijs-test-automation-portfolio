import { expect, Page } from '@playwright/test';


export class CheckoutPage {

  constructor(private page: Page) {}

  async expectCheckoutPageIsVisible() {
    await expect(this.page.getByText('Checkout')).toBeVisible();
  }

  async fillCheckoutForm() {
    await this.page.getByLabel('Full Name').fill('Jan Kowalski');
    await this.page.getByLabel('Street Address').fill('ul. Testowa 1');
    await this.page.getByLabel('City').fill('Warsaw');
    await this.page.getByLabel('ZIP Code').fill('00-001');
  }

  async verifyCheckoutFormValues() {
    await expect(this.page.getByLabel('Full Name')).toHaveValue('Jan Kowalski');
    await expect(this.page.getByLabel('Street Address')).toHaveValue('ul. Testowa 1');
    await expect(this.page.getByLabel('City')).toHaveValue('Warsaw');
    await expect(this.page.getByLabel('ZIP Code')).toHaveValue('00-001');
  }

  async selectExpressDelivery() {
    await this.page.getByText('Express Delivery').click();
  }

  async placeOrder() {
    await this.page.getByRole('button', { name: /Place Order/i }).click();
  }
}