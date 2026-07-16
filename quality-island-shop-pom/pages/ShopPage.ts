import { expect, Page } from '@playwright/test';


export class ShopPage {

  constructor(private page: Page) { }


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


  async getCookbookPrice(): Promise<number> {
    const seleniumCard = this.page.locator('.section-card').filter({
      hasText: 'Selenium Cookbook',
    });

    const priceText = await seleniumCard
      .locator('[data-testid^="product-price"]')
      .textContent();

    return Number(priceText?.replace('$', '').trim());
  }

  async buyCookbook() {
    const seleniumCard = this.page.locator('.section-card').filter({
      hasText: 'Selenium Cookbook'
    });
    await seleniumCard.getByRole('button', {
      name: 'Add to Cart'
    }).click();
  }
  async openCart() {
    await this.page.getByTestId('btn-shop-cart').click();
  }

  async filterByCategoryBooks() {
    await this.page.getByTestId('filter-category-books').click();
  }

  async checkFilterAndCounter() {
    const products = this.page.locator('[data-testid^="product-card-"]');
    const actualCount = await products.count();
    const counterText = await this.page.getByTestId('products-count').textContent();
    const displayedCount = Number(counterText?.match(/\d+/)?.[0]);

    expect(displayedCount).toBe(actualCount);
    for (let i = 0; i < actualCount; i++) {
      await expect(products.nth(i)).toHaveAttribute('data-category', 'books');
    }
  }
}

