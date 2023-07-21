export interface Product {
  id: number,
  name: string,
  type: string,
  price: number,
  discount: number,
  count: number,
  poster: string
}

export interface GetProductResponseData {
  response: boolean,
  error: string,
  products: Array<Product>
}

export interface ProductInBasket {
  id: number,
  name: string,
  type: string,
  price: number,
  discount: number,
  count: number,
  poster: string,
  inBasketCount: number,
}
