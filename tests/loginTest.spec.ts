import { test, expect } from '@playwright/test';


test('check login process', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/shop/login');

await expect(page.getByText('Sign In to Shop')).toBeVisible()
  
// Fill in the login form
  await page.getByLabel('Email').fill('test@qualityisland.pl');
  await page.getByTestId('login-password').fill('Test1234');
});
