import { Product } from './interfaces';

/**
 * Provide Product data for single item which met conditions.
 * @param productType describe product type: 'standard' or with 'discount'.
 * @param productNumber expected product position displayed on web page for products which met `productType` condition.
 * @returns object with data for single product
 */
export function productSelector(responseProductsArray: Array<Product>, productType: string, productNumber: string) {
  const appropriateProducts = responseProductsArray.filter(product => {
    return productType === 'standard' ? product.discount === 0 : product.discount > 0;
  });
  return appropriateProducts[Number(productNumber) - 1];
}
