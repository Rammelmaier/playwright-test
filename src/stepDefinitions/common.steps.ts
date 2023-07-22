import { Given, Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/pageFixture';
import { URL } from '../constants';
import { ShopPage } from '../pages/shop.page';
import { GetProductResponseData } from '../helpers/interfaces';
import StepMemory from '../utils/shareStepData';
import { productSelector } from '../helpers/productSelector';
import { expect } from '@playwright/test';

Given(/^I reset dedicated shared storage$/, async function () {
  // scenario outline is NOT refreshes StepMemory, so it required forced refresh for critical props
  StepMemory.notProtectedSave('purchase', undefined);
});

Given(/^I open Shop "(Login page)"$/, async function (page: string) {
  const targetPage = URL[page as keyof typeof URL];
  await pageFixture.page.goto(targetPage);
});

Then(/^I clear basket via UI when it contains items$/, { timeout: 60 * 1000 }, async function () {
  const shopPage = new ShopPage(pageFixture.page);
  let itemsInBasket = Number(await shopPage.headerComponent.getItemsQtyInBasket());
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
    await shopPage.page.waitForTimeout(500);
    itemsInBasket = Number(await shopPage.headerComponent.getItemsQtyInBasket());
  }
  // clean basket via clean button
  if (itemsInBasket > 0 && itemsInBasket !== 9) {
    await shopPage.headerComponent.clickBasketElement();
    await shopPage.basketOverlay.clickClearBasketButton();
    await shopPage.page.waitForTimeout(500);
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

Then(/^I expect "(\d+)" displayed near header basket button$/, async function (itemQty: string) {
  const shopPage = new ShopPage(pageFixture.page);
  await shopPage.headerComponent.dropdownBasket.scrollIntoViewIfNeeded();
  await shopPage.page.waitForTimeout(250);
  const recheckItemsInBasket = Number(await shopPage.headerComponent.getItemsQtyInBasket());
  expect(recheckItemsInBasket).toEqual(Number(itemQty));
});
