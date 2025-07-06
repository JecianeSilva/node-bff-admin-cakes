import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { HttpServiceInterceptor } from '../middlewares/interceptor';
import { ZodValidationPipe } from '../utils';
import { ICategoryService } from '../service/category.service';
import { GetCategoriesQueryParamSchema, ICategory, IPostSaveCategoryResponse, PostSaveCategoryRequestBodySchema, PutCategoryRequestBodySchema, TGetCategoriesQueryParam, TGetCategoriesResponse, TPostSaveCategoryRequestBodySchema, TPutCategoryRequestBodySchema } from 'cakes-lib-types-js';

@UseInterceptors(HttpServiceInterceptor)
@Controller('/category')
export class CategoryController {
  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
  ) {}
  @Get()
  @HttpCode(200)
  async getCategories(
    @Query(new ZodValidationPipe(GetCategoriesQueryParamSchema))
    queryParams: TGetCategoriesQueryParam
  ): Promise<TGetCategoriesResponse> {
    return await this.categoryService.getCategories(queryParams)
  }

  @Get('/:id')
  @HttpCode(200)
  async getCategoryById(
    @Param('id')
    id: string,
  ): Promise<ICategory> {
    return await this.categoryService.getCategoryById(id)
  }


  @Post()
  @HttpCode(201)
  async postSaveCategory(
    @Body(new ZodValidationPipe(PostSaveCategoryRequestBodySchema))
    body: TPostSaveCategoryRequestBodySchema
  ): Promise<IPostSaveCategoryResponse> {
    return await this.categoryService.postSaveCategory(body)
  }

  @Put('/:id')
  @HttpCode(200)
  async updatedCategory(
    @Param('id')
    id: string,
    @Body(new ZodValidationPipe(PutCategoryRequestBodySchema))
    body: TPutCategoryRequestBodySchema
  ): Promise<void> {
    return await this.categoryService.updateCategory(id, body)
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteCategory(
    @Param('id')
    id: string
  ): Promise<void> {
    return await this.categoryService.deleteCategory(id)
  }
}
