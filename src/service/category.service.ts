import { Inject, Injectable } from "@nestjs/common";
import { ICategoryClient } from "../client/interfaces/categoryInterface";
import { ICategory, IPostSaveCategoryResponse, TDeleteCategoryParam, TGetCategoriesQueryParam, TGetCategoriesResponse, TPostSaveCategoryRequestBody, TPutCategoryParam, TPutCategoryRequestBody, TPutCategoryStatusRequestBody } from "cakes-lib-types-js";

export interface ICategoryService {
  getCategories(queryParams: TGetCategoriesQueryParam): Promise<TGetCategoriesResponse>
  getCategoryById(id: string): Promise<ICategory>
  postSaveCategory(body: TPostSaveCategoryRequestBody): Promise<IPostSaveCategoryResponse>
  updateCategory(id: TPutCategoryParam, body: TPutCategoryRequestBody): Promise<void>
  updateCategoryStatus(id: TPutCategoryParam, status: TPutCategoryStatusRequestBody): Promise<void>;
  deleteCategory(id: TDeleteCategoryParam): Promise<void>
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

  async postSaveCategory(body: TPostSaveCategoryRequestBody): Promise<IPostSaveCategoryResponse> {
      return await this.categoryClient.postSaveCategory(body)
  }

  async updateCategory(id: TPutCategoryParam, body: TPutCategoryRequestBody): Promise<void> {
      return await this.categoryClient.updateCategory(id, body)
  }

  async updateCategoryStatus(id: TPutCategoryParam, body: TPutCategoryStatusRequestBody): Promise<void> {
      return await this.categoryClient.updateCategoryStatus(id, body)
  }

  async deleteCategory(id: TDeleteCategoryParam): Promise<void> {
      return await this.categoryClient.deleteCategory(id)
  }
}