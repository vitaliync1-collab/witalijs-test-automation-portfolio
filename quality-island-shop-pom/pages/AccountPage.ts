import { expect, Page } from '@playwright/test';


export class AccountPage {

  constructor(private page: Page) {}

  async expectAccountPageIsVisible() {
    await expect(this.page.getByText('My Account')).toBeVisible();
  }

}