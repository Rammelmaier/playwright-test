import { type Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';
import { pageFixture } from '../utils/pageFixture';
import { BasketOverlayComponent } from './components/basketOverlay.component';

export class ShopPage {

  readonly page: Page;

  Elements = {
    // eslint-disable-next-line
    productCardByProductName: (name: string) => `//div[contains(@class, 'note-item') and .//div[contains(@class, 'product_name')]/text()='${name}']`,
    // eslint-disable-next-line
    productPriceByProductName: (name: string) => `//div[contains(@class, 'note-item') and .//div[contains(@class, 'product_name')]/text()='${name}']//span[contains(@class, 'product_price')]`,
    // eslint-disable-next-line
    productQtyInputByProductName: (name: string) => `//div[contains(@class, 'note-item') and .//div[contains(@class, 'product_name')]/text()='${name}']//input[@name="product-enter-count"]`,
    // eslint-disable-next-line
    productAddBtnByProductName: (name: string) => `//div[contains(@class, 'note-item') and .//div[contains(@class, 'product_name')]/text()='${name}']//button[contains(@class, 'actionBuyProduct')]`,

    goToNexPageButton: (pageNumber: string) => `li.page-item [data-page-number='${pageNumber}']`
  }

  headerComponent = new HeaderComponent(pageFixture.page);
  basketOverlay = new BasketOverlayComponent(pageFixture.page);

  constructor(page: Page) {
    this.page = page;
  }

  async setProductQuantity(qty: string, productName: string) {
    await this.page.locator(this.Elements.productQtyInputByProductName(productName)).fill(qty.toString());
  }

  async clickProductAddButton(productName: string) {
    await this.page.locator(this.Elements.productAddBtnByProductName(productName)).click();
  }

  async clickGoToNexPageButton(pageNumber: string) {
    await this.page.locator(this.Elements.goToNexPageButton(pageNumber)).click();
  }

}
