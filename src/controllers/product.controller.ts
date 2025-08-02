import { Body, Controller, Delete, Get, Headers, HttpCode, Inject, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { HttpServiceInterceptor } from '../middlewares/interceptor';
import { ZodValidationPipe } from '../utils';
import { GetProductQueryParamsSchema, IPostSaveProductResponse, IProduct, PostSaveProductRequestBodySchema, PutProductRequestBodySchema, TGetProductQueryParams, TGetProductsResponse, TPostSaveProductRequestBody, TPutProductRequestBody } from 'cakes-lib-types-js';
import { IProductService } from '../service/product.service';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('image'))
  async postSaveProduct(
    @Body(new ZodValidationPipe(PostSaveProductRequestBodySchema))
    body: TPostSaveProductRequestBody,
    @UploadedFile() 
    image?: Express.Multer.File,
  ): Promise<IPostSaveProductResponse> {
    return await this.productService.postSaveProduct(body, image)
  }

  @Put('/:id')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image'))
  async updatedProduct(
    @Param('id')
    id: string,
    @Body(new ZodValidationPipe(PutProductRequestBodySchema))
    body: TPutProductRequestBody,
    @UploadedFile() 
    image?: Express.Multer.File,
  ): Promise<void> {
    return await this.productService.updatedProduct(id, body, image)
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
