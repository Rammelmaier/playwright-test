import { expect } from '@playwright/test';
import { When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/pageFixture';
import { ShopPage } from '../pages/shop.page';
import StepMemory from '../utils/shareStepData';
import { GetProductResponseData } from '../helpers/interfaces';
import { productSelector } from '../helpers/productSelector';
import CrossStepPurchaseCalculator from '../helpers/purchaseCalculator';

// let shopPage = new ShopPage(pageFixture.page);

Then(/^I expect "Shop" page is opened$/, async function () {
  const shopPage = new ShopPage(pageFixture.page);
  await expect(shopPage.headerComponent.dropdownBasket).toBeVisible({ visible: true });
});

When(/^I click "Basket" button$/, async function () {
  const shopPage = new ShopPage(pageFixture.page);
  await shopPage.headerComponent.clickBasketElement();
});

When(/^I add "(\d+)" (piece|pieces) of "(standard|discount)" product "#(\d)" in basket$/, { timeout: 10000 },
  async function (qty, wordForm, productType, productNumber) {
    const shopPage = new ShopPage(pageFixture.page);

    // get product data on page
    const pageResponseData: GetProductResponseData = StepMemory.notProtectedLoad('productsData');
    const pageProductsArray = pageResponseData.products;
    const selectedProductData = productSelector(pageProductsArray, productType, productNumber);
    console.log('Product to add in basket', selectedProductData);

    // add product with qty
    await shopPage.setProductQuantity(qty, selectedProductData.name);
    await shopPage.clickProductAddButton(selectedProductData.name);

    // save added product details
    CrossStepPurchaseCalculator.addProductInCart(qty, selectedProductData);

    await shopPage.page.waitForTimeout(4000);

    console.log('Products in Basket', StepMemory.notProtectedLoad('purchase'));
  });
