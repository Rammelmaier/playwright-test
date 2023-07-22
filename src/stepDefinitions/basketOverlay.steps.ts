import { Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/pageFixture';
import { ShopPage } from '../pages/shop.page';
import { expect } from '@playwright/test';
import StepMemory from '../utils/shareStepData';
import { ProductInBasket } from '../helpers/interfaces';

Then(/^I expect Basket overlay is opened$/, { timeout: 10 * 1000 }, async function () {
  const shopPage = new ShopPage(pageFixture.page);
  const basketOverlayElem = shopPage.basketOverlay.Elements;
  await expect(shopPage.page.locator(basketOverlayElem.overlayContainer)).toBeVisible();
  await expect(shopPage.page.locator(basketOverlayElem.proceedToBasketPageButton)).toBeVisible();
  await shopPage.page.waitForTimeout(500);
});

Then(/^I click "(Navigate to Basket Page|Clear Basket)"$/, async function (button: string) {
  const shopPage = new ShopPage(pageFixture.page);
  button === 'Navigate to Basket Page' ?
    await shopPage.basketOverlay.clickProceedToBasketPageButton() : await shopPage.basketOverlay.clickClearBasketButton();
});

Then(/^I verify details for added in basket items$/, { timeout: 10000 }, async function () {
  const shopPage = new ShopPage(pageFixture.page);
  const basketOverlayElem = shopPage.basketOverlay.Elements;

  // verify unique item qty
  const uniqueProductsCount = await shopPage.basketOverlay.getUniqueProductsCountInBasketOverlay();
  const purchase: Array<ProductInBasket> = StepMemory.notProtectedLoad('purchase');
  console.log('PURCHASE DATA', purchase);
  expect(Number(uniqueProductsCount)).toBe(purchase.length);

  // verify each item details
  for (const item of purchase) {
    await expect(shopPage.page.locator(basketOverlayElem.itemImageByProductName(item.name))).toHaveAttribute('src', item.poster);
    const totalCostForPosition = (item.price - item.discount) * item.inBasketCount;
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
    const finalPrice = item.price - item.discount;
    totalCost += finalPrice * item.inBasketCount;
    // eslint-disable-next-line
    console.log('Item #' + index++ + ': ' + item.name + ' - ' + item.price + `(-${item.discount})` + ' x ' + item.inBasketCount + ' = ' + finalPrice * item.inBasketCount + '. Total cost: ' + totalCost);
  });
  console.log('Total cost for all items in basket:', totalCost);
  await expect(shopPage.page.locator(basketOverlayElem.basketItemsTotalPrice)).toContainText(totalCost.toString());
});
