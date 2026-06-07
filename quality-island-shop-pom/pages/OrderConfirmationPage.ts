import { expect, Page } from '@playwright/test';


export class OrderConfirmationPage {

  constructor(private page: Page) {}

  async expectOrderConfirmationPageIsVisible() {
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }
}