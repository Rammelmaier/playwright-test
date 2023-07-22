import { expect } from '@playwright/test';
import { When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/pageFixture';
import { ShopPage } from '../pages/shop.page';
import { URL } from '../constants';
import StepMemory from '../utils/shareStepData';
import { GetProductResponseData, ProductInBasket } from '../helpers/interfaces';
import { productSelector } from '../helpers/productSelector';
import CrossStepPurchaseCalculator from '../helpers/purchaseCalculator';

Then(/^I expect "Shop" page is opened$/, async function () {
  const shopPage = new ShopPage(pageFixture.page);
  await expect(shopPage.page).toHaveURL(URL['Shop page']);
  await expect(shopPage.headerComponent.dropdownBasket).toBeVisible({ visible: true });
});

When(/^I click "Basket" button$/, async function () {
  const shopPage = new ShopPage(pageFixture.page);
  await shopPage.headerComponent.clickBasketElement();
});

When(/^I add "(\d+)" (piece|pieces) of "(standard|discount)" product "#(\d)" in basket$/, { timeout: 10 * 1000 },
  async function (qty: string, wordForm: string, productType: string, productNumber: string) {
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
    await shopPage.page.waitForTimeout(500);
    console.log('Products in Basket', StepMemory.notProtectedLoad('purchase'));
  });

When(/^I go to "(\d+)" page via page navigation element$/, async function (pageNumber: string) {
  const shopPage = new ShopPage(pageFixture.page);
  await shopPage.clickGoToNexPageButton(pageNumber);
  const responsePromise = shopPage.page.waitForResponse('**/product/get');
  const response = await responsePromise;
  StepMemory.notProtectedSave('productsData', JSON.parse(await response.text()));
});

When(/^I add "(\d+)" unique different products in basket$/, { timeout: 60 * 1000 * 2 }, async function (requestedProducts: string) {
  const shopPage = new ShopPage(pageFixture.page);

  let page = 1;
  let addedUniqueProducts = 0;
  let isProductAlreadyInBasket: boolean;

  do {
    // get product data on current page from memory
    const pageResponseData: GetProductResponseData = StepMemory.notProtectedLoad('productsData');
    const pageProductsArray = pageResponseData.products;
    for (const product of pageProductsArray) {
      isProductAlreadyInBasket = false;
      const purchase: Array<ProductInBasket> = StepMemory.notProtectedLoad('purchase');
      for (const basketItem of purchase) {
        // verify is product already in basket?
        product.name === basketItem.name ? isProductAlreadyInBasket = true : '';
      }
      if (!isProductAlreadyInBasket && addedUniqueProducts < Number(requestedProducts)) {
        // add unique product
        console.log('Add product:', product.name);
        await shopPage.setProductQuantity('1', product.name);
        await shopPage.clickProductAddButton(product.name);
        await shopPage.page.waitForTimeout(500);

        // save added product details
        CrossStepPurchaseCalculator.addProductInCart('1', product);
        console.log('Product saved');
        addedUniqueProducts++
      }
    }

    if (addedUniqueProducts < Number(requestedProducts)) {
      // go to next page if items is not enough
      page++
      await shopPage.clickGoToNexPageButton((page).toString());
      // intercept api call response with list of products on next page
      const responsePromise = shopPage.page.waitForResponse('**/product/get');
      const response = await responsePromise;
      StepMemory.notProtectedSave('productsData', JSON.parse(await response.text()));
    }

  } while (addedUniqueProducts < Number(requestedProducts));

});
