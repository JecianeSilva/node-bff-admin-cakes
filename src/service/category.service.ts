import { Inject, Injectable } from "@nestjs/common";
import { ICategoryClient } from "../client/interfaces/categoryInterface";
import { ICategory, IPostSaveCategoryResponse, TGetCategoriesQueryParam, TGetCategoriesResponse, TPostSaveCategoryRequestBodySchema, TPutCategoryRequestBodySchema } from "cakes-lib-types-js";

export interface ICategoryService {
  getCategories(queryParams: TGetCategoriesQueryParam): Promise<TGetCategoriesResponse>
  getCategoryById(id: string): Promise<ICategory>
  postSaveCategory(body: TPostSaveCategoryRequestBodySchema): Promise<IPostSaveCategoryResponse>
  updateCategory(id: string, body: TPutCategoryRequestBodySchema): Promise<void>
  deleteCategory(id: string): Promise<void>
}

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject('ICategoryClient')
    private readonly categoryClient: ICategoryClient
  ) {}

  async getCategories(queryParams: TGetCategoriesQueryParam): Promise<TGetCategoriesResponse> {
    return await this.categoryClient.getCategories(queryParams)
  }

  async getCategoryById(id: string): Promise<ICategory> {
      return await this.categoryClient.getCategoryById(id)
  }

  async postSaveCategory(body: TPostSaveCategoryRequestBodySchema): Promise<IPostSaveCategoryResponse> {
      return await this.categoryClient.postSaveCategory(body)
  }

  async updateCategory(id: string, body: TPutCategoryRequestBodySchema): Promise<void> {
      return await this.categoryClient.updateCategory(id, body)
  }

  async deleteCategory(id: string): Promise<void> {
      return await this.categoryClient.deleteCategory(id)
  }
}