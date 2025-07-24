import { IPostSaveProductResponse, IProduct, TDeleteProductParam, TGetProductQueryParams, TGetProductsResponse, TPostSaveProductRequestBody, TPutProductRequestBody } from "cakes-lib-types-js"

export interface IProductsClient {
  getProducts(queryParams: TGetProductQueryParams): Promise<TGetProductsResponse>
  getProductById(id: string): Promise<IProduct>
  postSaveProduct(body: TPostSaveProductRequestBody): Promise<IPostSaveProductResponse>
  updatedProduct(id: string, body: TPutProductRequestBody): Promise<void>
  deleteProduct(id: TDeleteProductParam): Promise<void>
}