import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';

test('Sign in to the Shop', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.page.goto('https://enotes.pointschool.ru/login');
  await loginPage.enterLogin('test');
  await loginPage.enterPassword('test');
  await loginPage.clickSubmitButton();
});
