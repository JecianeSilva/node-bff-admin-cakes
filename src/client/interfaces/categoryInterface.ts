import { ICategory, TGetCategoriesQueryParam, TGetCategoriesResponse, IPostSaveCategoryResponse, TPutCategoryStatusRequestBody, TPostSaveCategoryRequestBody, TPutCategoryParam, TDeleteCategoryParam, TPutCategoryRequestBody } from "cakes-lib-types-js"

export interface ICategoryClient {
  getCategories(queryParams: TGetCategoriesQueryParam): Promise<TGetCategoriesResponse>
  getCategoryById(id: string): Promise<ICategory>
  postSaveCategory(body: TPostSaveCategoryRequestBody): Promise<IPostSaveCategoryResponse>
  updateCategory(id: TPutCategoryParam, body: TPutCategoryRequestBody): Promise<void>
  updateCategoryStatus(id: TPutCategoryParam, status: TPutCategoryStatusRequestBody): Promise<void>;
  deleteCategory(id: TDeleteCategoryParam): Promise<void>
}