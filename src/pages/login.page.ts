import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {

  page: Page;

  Elements = {
    loginInput: '#loginform-username',
    passwordInput: '#loginform-password',
    submitButton: 'button[type="submit"]'
  }

  constructor(page: Page) {
    this.page = page;
  }

  async enterLogin(login: string) {
    await this.page.fill(this.Elements.loginInput, login);
  }

  async enterPassword(password: string) {
    await this.page.type(this.Elements.passwordInput, password);
  }

  async clickSubmitButton() {
    await this.page.click(this.Elements.submitButton);
  }
}
