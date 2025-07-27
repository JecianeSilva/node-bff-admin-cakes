import { ICategory, TGetCategoriesQueryParam, TGetCategoriesResponse, IPostSaveCategoryResponse, TPutCategoryStatusRequestBody, TPostSaveCategoryRequestBody, TPutCategoryParam, TPutCategoryRequestBody } from "cakes-lib-types-js"

export interface ICategoryClient {
  getCategories(queryParams?: TGetCategoriesQueryParam): Promise<TGetCategoriesResponse>
  getCategoryById(id: string): Promise<ICategory>
  postSaveCategory(body: TPostSaveCategoryRequestBody, image: any): Promise<IPostSaveCategoryResponse>
  updateCategory(id: TPutCategoryParam, body: TPutCategoryRequestBody, image: any): Promise<void>
  updateCategoryStatus(id: TPutCategoryParam, status: TPutCategoryStatusRequestBody): Promise<void>;
  deleteCategory(id: string): Promise<void>
}