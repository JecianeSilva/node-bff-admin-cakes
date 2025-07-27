import { IProductsClient } from './interfaces/ProductInterface';
import { IHttpClientService } from '../service/http-client.service';
import { Inject, Injectable } from "@nestjs/common";
import { queryString } from '../utils/queryString';
import { IPostSaveProductResponse, IProduct, TGetProductQueryParams, TGetProductsResponse, TPostSaveProductRequestBody, TPutProductRequestBody } from 'cakes-lib-types-js';

@Injectable()
export class ProductsClient implements IProductsClient {
  constructor(
    @Inject('IHttpClientService')
    private readonly HttpClientService: IHttpClientService
  ) {}

  async getProducts(queryParams: TGetProductQueryParams): Promise<TGetProductsResponse> {
    const { data } = await this.HttpClientService.get<TGetProductsResponse>(
      `${process.env.API_BASE_URL}/products?${queryString.encode(queryParams)}`,
    )
    return data
  }

  async getProductById(id: string): Promise<IProduct> {
    const { data } = await this.HttpClientService.get<IProduct>(
      `${process.env.API_BASE_URL}/products/${id}`,
    )
    return data
  }

  async postSaveProduct(body: TPostSaveProductRequestBody): Promise<IPostSaveProductResponse> {
    const { data } = await this.HttpClientService.post<IPostSaveProductResponse>(
      `${process.env.API_BASE_URL}/products/`,
      body
    )
    return data
  }

  async updatedProduct(id: string, body: TPutProductRequestBody): Promise<void> {
      const { data } = await this.HttpClientService.put<void>(
        `${process.env.API_BASE_URL}/products/${id}`,
        body
      )
      return data
  }

  async deleteProduct(id: string): Promise<void> {
      const { data } = await this.HttpClientService.delete<void>(
        `${process.env.API_BASE_URL}/products/${id}`,
      )
      return data
  }
}