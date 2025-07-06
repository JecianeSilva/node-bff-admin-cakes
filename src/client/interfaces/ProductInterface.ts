import { TGetProductQueryParam, TGetProductsResponse } from "cakes-lib-types-js"

export interface IProductsClient {
  getProducts(queryParams: TGetProductQueryParam): Promise<TGetProductsResponse>
}
export interface IProductService {
  getProducts(queryParams: TGetProductQueryParam): Promise<TGetProductsResponse>
}