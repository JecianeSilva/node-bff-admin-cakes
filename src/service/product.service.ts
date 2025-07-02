import { Inject, Injectable } from "@nestjs/common";

interface IGetProductsResponse {
  name: string
}

interface IProductClient {
  getProducts(active: boolean): Promise<IGetProductsResponse>
}

interface IProductService {
  getProducts(active: boolean): Promise<IGetProductsResponse>
}

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject('IProductsClient')
    private readonly productsClient: IProductClient
  ) {}

  async getProducts(active: boolean): Promise<IGetProductsResponse> {
    const data = await this.productsClient.getProducts(active)
    return data
  }
}