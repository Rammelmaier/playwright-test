import { type Page } from '@playwright/test';

export class BasketOverlayComponent {

  readonly page: Page;

  Elements = {
    overlayContainer: 'div[aria-labelledby="dropdownBasket"]',
    basketProductsList: 'div.dropdown-menu ul li',
    removeProductButtonByItsPosition: (productPosition: string) => `ul.list-group li:nth-child(${productPosition}) i.actionDeleteProduct`,
    // eslint-disable-next-line
    itemImageByProductName: (productName: string) => `//div[contains(@class, 'dropdown-menu')]/ul/li[span[contains(text(), '${productName}')]]//img`,
    // eslint-disable-next-line
    itemCostByProductName: (productName: string) => `//div[contains(@class, 'dropdown-menu')]/ul/li[span[contains(text(), '${productName}')]]//span[@class='basket-item-price']`,
    // eslint-disable-next-line
    itemQtyByProductName: (productName: string) => `//div[contains(@class, 'dropdown-menu')]/ul/li[span[contains(text(), '${productName}')]]//span[contains(@class, 'basket-item-count')]`,
    basketItemsTotalPrice: 'span.basket_price',
    proceedToBasketPageButton: '//a[@role="button"][contains(text(), "Перейти в корзину")]',
    clearBasketButton: 'div.dropdown-menu div.actionClearBasket a',
  }

  constructor(page: Page) {
    this.page = page;
  }

  async getUniqueProductsCountInBasketOverlay() {
    return await this.page.locator(this.Elements.basketProductsList).count();
  }

  async clickProceedToBasketPageButton() {
    await this.page.locator(this.Elements.proceedToBasketPageButton).click();
  }

  async clickRemoveProductButtonByItsPosition(productPosition: string) {
    await this.page.locator(this.Elements.removeProductButtonByItsPosition(productPosition)).click();
  }

  async clickClearBasketButton() {
    await this.page.locator(this.Elements.clearBasketButton).click();
  }

}
