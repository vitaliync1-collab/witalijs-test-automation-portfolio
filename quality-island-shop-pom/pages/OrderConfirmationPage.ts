import { expect, Page } from '@playwright/test';


export class OrderConfirmationPage {

  constructor(private page: Page) {}

  async expectOrderConfirmationPageIsVisible() {
    await expect(this.page.getByText('Order Confirmed!')).toBeVisible();
  }
}