import { Inject, Injectable } from "@nestjs/common";
import { TGetProductQueryParam, TGetProductsResponse } from "cakes-lib-types-js";
import { IProductsClient } from "../client/interfaces/ProductInterface";

export interface IProductService {
  getProducts(queryParams: TGetProductQueryParam): Promise<TGetProductsResponse>
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
}