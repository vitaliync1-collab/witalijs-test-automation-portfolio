import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Verify login process with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.fillLoginForm('invalid@example.com', 'invalidpassword');
    await loginPage.submitLoginForm();
    await loginPage.expectLoginFailedMessageIsVisible();
    await loginPage.expectLoginPageIsVisible();
});