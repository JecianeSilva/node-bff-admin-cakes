import { Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { GetProductQueryParamsSchema, TGetProductQueryParam, TGetProductResponse } from 'cakes-lib-types-js';
import { IProductService } from '../client/interfaces/ProductInterface';
import { HttpServiceInterceptor } from '../middlewares/interceptor';
import { ZodValidationPipe } from '../utils';

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
  ): Promise<TGetProductResponse> {
    return await this.productService.getProducts(queryParams.status)
  }
}
