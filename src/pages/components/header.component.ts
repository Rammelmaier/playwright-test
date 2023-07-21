import { type Locator, type Page } from '@playwright/test';

export class HeaderComponent {

  readonly page: Page;
  readonly dropdownBasket: Locator;
  readonly basketItemsLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdownBasket = page.locator('#dropdownBasket');
    this.basketItemsLabel = page.locator('span.basket-count-items');
  }

  async clickBasketElement() {
    await this.dropdownBasket.click();
  }

  async getItemsQtyInBasket() {
    return await this.basketItemsLabel.textContent();
  }

}
