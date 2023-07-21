import { Product, ProductInBasket } from './interfaces';
import StepMemory from '../utils/shareStepData';

class CrossStepPurchaseCalculator {

  private loadPurchaseDetails() {
    const basketData: Array<ProductInBasket> = StepMemory.notProtectedLoad('purchase');
    return basketData;
  }

  private savePurchaseDetails(basketData: Array<ProductInBasket>) {
    StepMemory.notProtectedSave('purchase', basketData);
  }

  addProductInCart(qty: string, productData: Product) {
    let basketData: Array<ProductInBasket> = this.loadPurchaseDetails();

    if (basketData) {

      const isAddedProductExistsInPurchase = basketData.some(data => data.name === productData.name);
      if (isAddedProductExistsInPurchase) {
        basketData.forEach(product => product.name === productData.name ? product.inBasketCount + Number(qty) : '')
      } else {
        const newProductInCart: ProductInBasket = Object.assign({ inBasketCount: Number(qty) }, productData);
        basketData.push(newProductInCart);
      }

    } else {
      basketData = [Object.assign({ inBasketCount: Number(qty) }, productData)];
    }

    this.savePurchaseDetails(basketData);
  }

}

export default new CrossStepPurchaseCalculator();
