import { Body, Controller, Delete, Get, Headers, HttpCode, Inject, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { HttpServiceInterceptor } from '../middlewares/interceptor';
import { ZodValidationPipe } from '../utils';
import { GetProductQueryParamsSchema, IPostSaveProductResponse, IProduct, PostSaveProductRequestBodySchema, PutProductRequestBodySchema, TGetProductQueryParams, TGetProductsResponse, TPostSaveProductRequestBody, TPutProductRequestBody } from 'cakes-lib-types-js';
import { IProductService } from '../service/product.service';

@UseInterceptors(HttpServiceInterceptor)
@Controller('/product')
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService,
  ) {}
  @Get()
  @HttpCode(200)
  async getProducts(
    @Query(new ZodValidationPipe(GetProductQueryParamsSchema))
    queryParams?: TGetProductQueryParams
  ): Promise<TGetProductsResponse> {
    return await this.productService.getProducts(queryParams)
  }

  @Get('/:id')
  @HttpCode(200)
  async getProductById(
    @Param('id')
    id: string,
  ): Promise<IProduct> {
    return await this.productService.getProductById(id)
  }

  @Post()
  @HttpCode(201)
  async postSaveProduct(
    @Body(new ZodValidationPipe(PostSaveProductRequestBodySchema))
    body: TPostSaveProductRequestBody
  ): Promise<IPostSaveProductResponse> {
    return await this.productService.postSaveProduct(body)
  }

  @Put('/:id')
  @HttpCode(200)
  async updatedProduct(
    @Param('id')
    id: string,
    @Body(new ZodValidationPipe(PutProductRequestBodySchema))
    body: TPutProductRequestBody
  ): Promise<void> {
    return await this.productService.updatedProduct(id, body)
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteProduct(
    @Param('id')
    id: string
  ): Promise<void> {
    return await this.productService.deleteProduct(id)
  }
}
