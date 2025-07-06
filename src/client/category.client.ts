import { IHttpClientService } from '../service/http-client.service';
import { Inject, Injectable } from "@nestjs/common";
import { queryString } from '../utils/queryString';
import { ICategoryClient } from './interfaces/categoryInterface';
import { ICategory, IPostSaveCategoryResponse, TGetCategoriesQueryParam, TGetCategoriesResponse, TPostSaveCategoryRequestBodySchema, TPutCategoryRequestBodySchema } from 'cakes-lib-types-js';

@Injectable()
export class CategoryClient implements ICategoryClient {
  constructor(
    @Inject('IHttpClientService')
    private readonly HttpClientService: IHttpClientService
  ) {}

  async getCategories(
    queryParams: TGetCategoriesQueryParam
  ): Promise<TGetCategoriesResponse> {
    const { status } = queryParams
    const { data } = await this.HttpClientService.get<TGetCategoriesResponse>(
      `${process.env.API_BASE_URL}/categories?${queryString.encode({status})}`,
    )
    return data
  }

  async getCategoryById(id: string): Promise<ICategory> {
      const { data } = await this.HttpClientService.get<ICategory>(
        `${process.env.API_BASE_URL}/categories/${id}`,
      )
      return data
  }

  async postSaveCategory(body: TPostSaveCategoryRequestBodySchema): Promise<IPostSaveCategoryResponse> {
      const { data } = await this.HttpClientService.post<IPostSaveCategoryResponse>(
        `${process.env.API_BASE_URL}/categories`,
        body
      )
      return data
  }

  async updateCategory(id: string, body: TPutCategoryRequestBodySchema): Promise<void> {
      const { data } = await this.HttpClientService.put<void>(
        `${process.env.API_BASE_URL}/categories/${id}`,
        body
      )
      return data
  }

  async deleteCategory(id: string): Promise<void> {
       const { data } = await this.HttpClientService.delete<void>(
        `${process.env.API_BASE_URL}/categories/${id}`,
      )
      return data
  }
}