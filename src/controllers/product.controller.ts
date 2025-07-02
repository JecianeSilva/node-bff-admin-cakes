import { Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { IGetProductsResponse, IProductService } from '../client/interfaces/ProductInterface';
import { HttpServiceInterceptor } from '../middlewares/interceptor';

@UseInterceptors(HttpServiceInterceptor)
@Controller('/products')
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService,
  ) {}
  @Get()
  async getProducts(
    @Query()
    queryParams: any
    // @Query(new ZodValidationPipe(GetProductQueryParamSchema))
    // queryParams: TGetProductQueryParam
  ): Promise<IGetProductsResponse> {
    return await this.productService.getProducts(queryParams.active)
  }
}
