import { TGetProductQueryParam } from "cakes-lib-types-js"

export interface IProductsClient {
  getProducts(status: string): Promise<TGetProductQueryParam>
}
export interface IProductService {
  getProducts(status: string): Promise<TGetProductQueryParam>
}