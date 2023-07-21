import { expect, type Locator, type Page } from '@playwright/test';
import { When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/pageFixture';
import { ShopPage } from '../pages/shop.page';
import StepMemory from '../utils/shareStepData';
import { ProductInBasket } from '../helpers/interfaces';

Then(/^I expect Basket overlay is opened$/, { timeout: 5000 }, async function () {
  const shopPage = new ShopPage(pageFixture.page);
  const basketOverlayElem = shopPage.basketOverlay.Elements;
  await expect(shopPage.page.locator(basketOverlayElem.overlayContainer)).toBeVisible();
  await expect(shopPage.page.locator(basketOverlayElem.proceedToBasketPageButton)).toBeVisible();
  await shopPage.page.waitForTimeout(2000);
});

Then(/^I verify details for added in basket items$/, { timeout: 10000 }, async function () {
  const shopPage = new ShopPage(pageFixture.page);
  const basketOverlayElem = shopPage.basketOverlay.Elements;

  // verify unique item qty
  const uniqueProductsCount = await shopPage.basketOverlay.getUniqueProductsCountInBasketOverlay();
  const purchase: Array<ProductInBasket> = StepMemory.notProtectedLoad('purchase');
  expect(Number(uniqueProductsCount)).toBe(purchase.length);

  // verify each item details
  for (const item of purchase) {
    await expect(shopPage.page.locator(basketOverlayElem.itemImageByProductName(item.name))).toHaveAttribute('src', item.poster);
    const totalCostForPosition = item.price * item.inBasketCount;
    await expect(shopPage.page.locator(basketOverlayElem.itemCostByProductName(item.name))).toContainText(totalCostForPosition.toString());
    await expect(shopPage.page.locator(basketOverlayElem.itemQtyByProductName(item.name))).toContainText(item.inBasketCount.toString());
  }
});

Then(/^I verify total cost of added in basket items$/, { timeout: 10000 }, async function () {
  const shopPage = new ShopPage(pageFixture.page);
  const basketOverlayElem = shopPage.basketOverlay.Elements;

  const purchase: Array<ProductInBasket> = StepMemory.notProtectedLoad('purchase');
  let totalCost = 0;
  purchase.forEach((item, index) => {
    totalCost += item.price * item.inBasketCount;
    console.log('Item #' + index++ + ': ' + item.name + ' - ' + item.price + ' x ' + item.inBasketCount + ' = ' + item.price * item.inBasketCount + '. Total cost: ' + totalCost);
  });
  console.log('Total cost for all items in basket:', totalCost);
  await expect(shopPage.page.locator(basketOverlayElem.basketItemsTotalPrice)).toContainText(totalCost.toString());
});
