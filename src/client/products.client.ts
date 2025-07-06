import { IProductsClient } from './interfaces/ProductInterface';
import { IHttpClientService } from '../service/http-client.service';
import { Inject, Injectable } from "@nestjs/common";
import { queryString } from '../utils/queryString';
import { TGetProductQueryParam, TGetProductsResponse } from 'cakes-lib-types-js';

@Injectable()
export class ProductsClient implements IProductsClient {
  constructor(
    @Inject('IHttpClientService')
    private readonly HttpClientService: IHttpClientService
  ) {}

  async getProducts(queryParams: TGetProductQueryParam): Promise<TGetProductsResponse> {
    const { data } = await this.HttpClientService.get<TGetProductsResponse>(
      `${process.env.API_BASE_URL}/products?${queryString.encode(queryParams)}`,
    )
    return data
  }
}