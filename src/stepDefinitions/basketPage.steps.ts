import { expect } from '@playwright/test';
import { Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/pageFixture';
import { BasketPage } from '../pages/basket.page';
import { URL } from '../constants';

Then(/^I expect "Basket" page is opened$/, { timeout: 10 * 1000 }, async function () {
  const basketPage = new BasketPage(pageFixture.page);
  await expect(basketPage.page).toHaveURL(URL['Basket page']);
  await expect(basketPage.headerComponent.dropdownBasket).toBeVisible();
  await expect(basketPage.page.locator(basketPage.Elements.contentContainer)).toBeVisible();
  const isErrorPresent = await basketPage.page.locator(basketPage.Elements.errorHeader).isVisible();
  if (isErrorPresent) {
    const message = await basketPage.page.locator(basketPage.Elements.errorHeader).textContent()
    throw new Error(`Page loaded with an error: ${message}`);
  }
});
