import {expect, Locator, Page} from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) {}
    
    async openLoginPage() {
        await this.page.goto('https://quality-arena-labs.base44.app/shop/login');
    }

    async fillLoginForm(email: string, password: string) {
        await this.page.getByLabel('Email').fill(email);
        await this.page.getByTestId('login-password').fill(password);
    }

    async submitLoginForm() {
        await this.page.getByRole('button', { name: 'Sign In' }).click();
    }

    async expectLoginPageIsVisible() {
        await expect(this.page.getByText('Sign In to Shop')).toBeVisible();
    }

    async expectLoginFailedMessageIsVisible() {
        await expect(this.page.getByText('Invalid email or password')).toBeVisible();
    }

    
}