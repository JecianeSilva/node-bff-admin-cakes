import { IHttpClientService } from '../service/http-client.service';
import { Inject, Injectable } from "@nestjs/common";
import { queryString } from '../utils/queryString';
import { ICategoryClient } from './interfaces/categoryInterface';
import { ICategory, IPostSaveCategoryResponse, TDeleteCategoryParam, TGetCategoriesQueryParam, TGetCategoriesResponse, TPostSaveCategoryRequestBody, TPutCategoryParam, TPutCategoryRequestBody, TPutCategoryStatusRequestBody } from 'cakes-lib-types-js';

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

  async postSaveCategory(body: TPostSaveCategoryRequestBody): Promise<IPostSaveCategoryResponse> {
      const { data } = await this.HttpClientService.post<IPostSaveCategoryResponse>(
        `${process.env.API_BASE_URL}/categories`,
        body
      )
      return data
  }

  async updateCategory(id: TPutCategoryParam, body: TPutCategoryRequestBody): Promise<void> {
      const { data } = await this.HttpClientService.put<void>(
        `${process.env.API_BASE_URL}/categories/${id}`,
        body
      )
      return data
  }

  async updateCategoryStatus(id: TPutCategoryParam, body: TPutCategoryStatusRequestBody): Promise<void> {
      const { data } = await this.HttpClientService.put<void>(
        `${process.env.API_BASE_URL}/categories/${id}/status`,
        body
      )
      return data
  }

  async deleteCategory(id: TDeleteCategoryParam): Promise<void> {
       const { data } = await this.HttpClientService.delete<void>(
        `${process.env.API_BASE_URL}/categories/${id}`,
      )
      return data
  }
}