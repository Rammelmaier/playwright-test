import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';
import { pageFixture } from '../utils/pageFixture';
import { BasketOverlayComponent } from './components/basketOverlay.component';

// const header = new HeaderComponent(pageFixture.page);
// const cartOverlay = new BasketOverlayComponent(pageFixture.page);

export class ShopPage {

  readonly page: Page;

  // .//div[contains(@class, 'note-item') and contains(@class, "hasDiscount") and //span[contains(@class, "product_count")]]

  // product cart by product name
  // .//div[contains(@class, 'note-item') and .//div[contains(@class, 'product_name')]/text()='Творческий беспорядок']

  Elements = {
    // fullPriceProductImage: (productNumber: string) => `(.//div[contains(@class, 'note-item') and not (contains(@class, "hasDiscount"))]//img)[${productNumber}]`,
    // fullPriceProductName: (productNumber: string) => `(.//div[contains(@class, 'note-item') and not (contains(@class, "hasDiscount"))]//div[contains(@class, 'product_name')])[${productNumber}]`,
    // fullPriceProductPrice: (productNumber: string) => `(.//div[contains(@class, 'note-item') and not (contains(@class, "hasDiscount"))]//span[contains(@class, 'product_price')])[${productNumber}]`,
    // fullPriceProductQtyInput: (productNumber: string) => `(.//div[contains(@class, 'note-item') and not (contains(@class, "hasDiscount"))]//input[@name="product-enter-count"])[${productNumber}]`,
    // fullPriceProductAddBtn: (productNumber: string) => `(.//div[contains(@class, 'note-item') and not (contains(@class, "hasDiscount"))]//button[contains(@class, 'actionBuyProduct')])[${productNumber}]`,


    // discountProduct: (productNumber: string) => `(.//div[contains(@class, "note-item") and contains(@class, "hasDiscount")]//img)[${productNumber}]`,
    // discountProductName: (productNumber: string) => `(.//div[contains(@class, 'note-item') and contains(@class, "hasDiscount")]//div[contains(@class, 'product_name')])[${productNumber}]`,
    // discountProductPrice: (productNumber: string) => `(.//div[contains(@class, 'note-item') and contains(@class, "hasDiscount")]//span[contains(@class, 'product_price')])[${productNumber}]`,
    // discountProductQtyInput: (productNumber: string) => `(.//div[contains(@class, 'note-item') and contains(@class, "hasDiscount")]//input[@name="product-enter-count"])[${productNumber}]`,
    // discountProductAddBtn: (productNumber: string) => `(.//div[contains(@class, 'note-item') and contains(@class, "hasDiscount")]//button[contains(@class, 'actionBuyProduct')])[${productNumber}]`,

    productCardByProductName: (name: string) => `//div[contains(@class, 'note-item') and .//div[contains(@class, 'product_name')]/text()='${name}']`,
    productPriceByProductName: (name: string) => `//div[contains(@class, 'note-item') and .//div[contains(@class, 'product_name')]/text()='${name}']//span[contains(@class, 'product_price')]`,
    productQtyInputByProductName: (name: string) => `//div[contains(@class, 'note-item') and .//div[contains(@class, 'product_name')]/text()='${name}']//input[@name="product-enter-count"]`,
    productAddBtnByProductName: (name: string) => `//div[contains(@class, 'note-item') and .//div[contains(@class, 'product_name')]/text()='${name}']//button[contains(@class, 'actionBuyProduct')]`,

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

}
