import { IPostSaveProductResponse, IProduct, TGetProductQueryParams, TGetProductsResponse, TPostSaveProductRequestBody, TPutProductRequestBody } from "cakes-lib-types-js"

export interface IProductsClient {
  getProducts(queryParams: TGetProductQueryParams): Promise<TGetProductsResponse>
  getProductById(id: string): Promise<IProduct>
  postSaveProduct(body: TPostSaveProductRequestBody, image: any): Promise<IPostSaveProductResponse>
  updatedProduct(id: string, body: TPutProductRequestBody, image: any): Promise<void>
  deleteProduct(id: string): Promise<void>
}