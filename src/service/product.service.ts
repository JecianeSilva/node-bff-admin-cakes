import { Inject, Injectable } from "@nestjs/common";
import { IPostSaveProductResponse, IProduct, TGetProductQueryParams, TGetProductsResponse, TPostSaveProductRequestBody, TPutProductRequestBody } from "cakes-lib-types-js";
import { IProductsClient } from "../client/interfaces/ProductInterface";

export interface IProductService {
  getProducts(queryParams: TGetProductQueryParams): Promise<TGetProductsResponse>
  getProductById(id: string): Promise<IProduct>
  postSaveProduct(body: TPostSaveProductRequestBody, image: any): Promise<IPostSaveProductResponse>
  updatedProduct(id: string, body: TPutProductRequestBody, image: any): Promise<void>
  deleteProduct(id: string): Promise<void>
}

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject('IProductsClient')
    private readonly productsClient: IProductsClient
  ) {}

  async getProducts(queryParams: TGetProductQueryParams): Promise<TGetProductsResponse> {
    const data = await this.productsClient.getProducts(queryParams)
    return data
  }

  async getProductById(id: string): Promise<IProduct> {
      const data = await this.productsClient.getProductById(id)
      return data
  }

  async postSaveProduct(body: TPostSaveProductRequestBody, image: any): Promise<IPostSaveProductResponse> {
      const data = await this.productsClient.postSaveProduct(body, image)
      return data
  }

  async updatedProduct(id: string, body: TPutProductRequestBody, image: any): Promise<void> {
      const data = await this.productsClient.updatedProduct(id, body, image)
      return data
  }

  async deleteProduct(id: string): Promise<void> {
       const data = await this.productsClient.deleteProduct(id)
      return data
  }
}