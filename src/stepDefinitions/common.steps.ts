import { Given, Then } from '@cucumber/cucumber';
import { Browser } from '@playwright/test';
import { pageFixture } from '../utils/pageFixture';
import { URL } from '../constants';
import { ShopPage } from '../pages/shop.page';
import { GetProductResponseData } from '../helpers/interfaces';
import StepMemory from '../utils/shareStepData';
import { productSelector } from '../helpers/productSelector';
import { expect } from '@playwright/test';

let browser: Browser;

Given(/^I open Shop "(Login page)"$/, async function (page: string) {
  const targetPage = URL[page as keyof typeof URL];
  await pageFixture.page.goto(targetPage);
});

// Then(/^I close browser$/, async function () {
//   await pageFixture.page.close();
//   await browser.close();
// });

Then(/^I clear basket manually if it contains items$/, { timeout: 60 * 1000 }, async function () {
  const shopPage = new ShopPage(pageFixture.page);
  const itemsInBasket = Number(await shopPage.headerComponent.getItemsQtyInBasket());
  console.log('CURRENT ITEMS IN BASKET', itemsInBasket);

  // there is bug with basket: if it contains 9 items its redirects to basket page instead of displaying basket overlay
  // so it necessary to add any item in basket to have ability interact with basket overlay
  if (itemsInBasket === 9) {
    // get product data on page
    const pageResponseData: GetProductResponseData = StepMemory.notProtectedLoad('productsData');
    const pageProductsArray = pageResponseData.products;
    const selectedProductData = productSelector(pageProductsArray, 'standard', '1');
    console.log('Product to add in basket', selectedProductData);

    // add 1 product
    await shopPage.setProductQuantity('1', selectedProductData.name);
    await shopPage.clickProductAddButton(selectedProductData.name);
  }
  // clean basket via clean button
  if (itemsInBasket !== 0 && itemsInBasket !== 9) {
    await shopPage.headerComponent.clickBasketElement();
    await shopPage.basketOverlay.clickClearBasketButton();
    await shopPage.page.waitForTimeout(1000);
    console.log('Cleaning Done');
  } else {
    console.log('Basket is not contains any items. Cleaning is not required.');
  }
});

Then(/^I expect basket is clear$/, async function () {
  const shopPage = new ShopPage(pageFixture.page);
  const recheckItemsInBasket = Number(await shopPage.headerComponent.getItemsQtyInBasket());
  expect(recheckItemsInBasket).toEqual(0);
});
