import { IGetProductsResponse, IProductsClient } from './interfaces/ProductInterface';
import { IHttpClientService } from '../service/http-client.service';
import { Inject, Injectable } from "@nestjs/common";
import { queryString } from '../utils/queryString';

@Injectable()
export class ProductsClient implements IProductsClient {
  constructor(
    @Inject('IHttpClientService')
    private readonly HttpClientService: IHttpClientService
  ) {}

  async getProducts(active: boolean): Promise<IGetProductsResponse> {
    const { data } = await this.HttpClientService.get<IGetProductsResponse>(
      `${process.env.API_BASE_URL}/products`,
    )
    return data
  }
}