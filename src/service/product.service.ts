import { Inject, Injectable } from "@nestjs/common";
import { IPostSaveProductResponse, IProduct, TDeleteProductParam, TGetProductQueryParam, TGetProductsResponse, TPostSaveProductRequestBody, TPutProductRequestBody } from "cakes-lib-types-js";
import { IProductsClient } from "../client/interfaces/ProductInterface";

export interface IProductService {
  getProducts(queryParams: TGetProductQueryParam): Promise<TGetProductsResponse>
  getProductById(id: string): Promise<IProduct>
  postSaveProduct(body: TPostSaveProductRequestBody): Promise<IPostSaveProductResponse>
  updatedProduct(id: string, body: TPutProductRequestBody): Promise<void>
  deleteProduct(id: TDeleteProductParam): Promise<void>
}

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject('IProductsClient')
    private readonly productsClient: IProductsClient
  ) {}

  async getProducts(queryParams: TGetProductQueryParam): Promise<TGetProductsResponse> {
    const data = await this.productsClient.getProducts(queryParams)
    return data
  }

  async getProductById(id: string): Promise<IProduct> {
      const data = await this.productsClient.getProductById(id)
      return data
  }

  async postSaveProduct(body: TPostSaveProductRequestBody): Promise<IPostSaveProductResponse> {
      const data = await this.productsClient.postSaveProduct(body)
      return data
  }

  async updatedProduct(id: string, body: TPutProductRequestBody): Promise<void> {
      const data = await this.productsClient.updatedProduct(id, body)
      return data
  }

  async deleteProduct(id: TDeleteProductParam): Promise<void> {
       const data = await this.productsClient.deleteProduct(id)
      return data
  }
}