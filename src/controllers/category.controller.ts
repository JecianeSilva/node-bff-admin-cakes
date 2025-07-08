import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { HttpServiceInterceptor } from '../middlewares/interceptor';
import { ZodValidationPipe } from '../utils';
import { ICategoryService } from '../service/category.service';
import { GetCategoriesQueryParamSchema, ICategory, IPostSaveCategoryResponse, PostSaveCategoryRequestBodySchema, PutCategoryRequestBodySchema, PutCategoryStatusRequestBodySchema, TDeleteCategoryParam, TGetCategoriesQueryParam, TGetCategoriesResponse, TPostSaveCategoryRequestBody, TPutCategoryParam, TPutCategoryRequestBody, TPutCategoryStatusRequestBody } from 'cakes-lib-types-js';

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
    body: TPostSaveCategoryRequestBody
  ): Promise<IPostSaveCategoryResponse> {
    return await this.categoryService.postSaveCategory(body)
  }

  @Put('/:id')
  @HttpCode(200)
  async updatedCategory(
    @Param('id')
    id: TPutCategoryParam,
    @Body(new ZodValidationPipe(PutCategoryRequestBodySchema))
    body: TPutCategoryRequestBody
  ): Promise<void> {
    return await this.categoryService.updateCategory(id, body)
  }

  @Put('/:id/status')
  @HttpCode(200)
  async updateCategoryStatus(
    @Param('id') id: TPutCategoryParam,
    @Body(new ZodValidationPipe(PutCategoryStatusRequestBodySchema))
    body: TPutCategoryStatusRequestBody
  ): Promise<void> {
    return await this.categoryService.updateCategoryStatus(id, body);
  }
  @Delete('/:id')
  @HttpCode(200)
  async deleteCategory(
    @Param('id')
    id: TDeleteCategoryParam
  ): Promise<void> {
    return await this.categoryService.deleteCategory(id)
  }
}
