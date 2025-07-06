import { Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { IProductService } from '../client/interfaces/ProductInterface';
import { HttpServiceInterceptor } from '../middlewares/interceptor';
import { ZodValidationPipe } from '../utils';
import { GetProductQueryParamsSchema, TGetProductQueryParam, TGetProductsResponse } from 'cakes-lib-types-js';

@UseInterceptors(HttpServiceInterceptor)
@Controller('/products')
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService,
  ) {}
  @Get()
  async getProducts(
    @Query(new ZodValidationPipe(GetProductQueryParamsSchema))
    queryParams: TGetProductQueryParam
  ): Promise<TGetProductsResponse> {
    return await this.productService.getProducts(queryParams)
  }
}
