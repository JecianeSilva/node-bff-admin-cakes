import { IHttpClientService } from '../service/http-client.service';
import FormData from 'form-data';
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
    queryParams?: TGetCategoriesQueryParam
  ): Promise<TGetCategoriesResponse> {
    const { data } = await this.HttpClientService.get<TGetCategoriesResponse>(
      `${process.env.API_BASE_URL}/categories?${queryString.encode(queryParams)}`,
    )
    return data
  }

  async getCategoryById(id: string): Promise<ICategory> {
      const { data } = await this.HttpClientService.get<ICategory>(
        `${process.env.API_BASE_URL}/categories/${id}`,
      )
      return data
  }

  async postSaveCategory(body: TPostSaveCategoryRequestBody, image: any): Promise<IPostSaveCategoryResponse> {
    const formData = new FormData();
    formData.append('name', body.name);
    if (body.description) {
      formData.append('description', body.description);
    }
    if (image) {
      formData.append('image', image.buffer, image.originalname);
    }
    const { data } = await this.HttpClientService.post<IPostSaveCategoryResponse>(
        `${process.env.API_BASE_URL}/categories`,
        formData, {
          headers: {
            ...formData.getHeaders(),
          }
        }
      )
      return data
  }

  async updateCategory(id: TPutCategoryParam, body: TPutCategoryRequestBody, image: any): Promise<void> {
    const formData = new FormData();
    if (body.name) formData.append('name', body.name);
    if (body.description) formData.append('description', body.description);
    if (body.status) formData.append('status', body.status);
    if (image) {
      formData.append('image', image.buffer, image.originalname);
    }
    const { data } = await this.HttpClientService.put<void>(
        `${process.env.API_BASE_URL}/categories/${id}`,
        formData, 
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
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