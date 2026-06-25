import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';

test('Verify login process with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);
    await loginPage.openLoginPage();
    await loginPage.fillLoginForm('test@qualityisland.pl', 'Test1234!');
    await loginPage.submitLoginForm();
    await accountPage.expectAccountPageIsVisible();
});

