import { ICategory, TGetCategoriesQueryParam, TPostSaveCategoryRequestBodySchema, TGetCategoriesResponse, IPostSaveCategoryResponse, TPutCategoryRequestBodySchema } from "cakes-lib-types-js"

export interface ICategoryClient {
  getCategories(queryParams: TGetCategoriesQueryParam): Promise<TGetCategoriesResponse>
  getCategoryById(id: string): Promise<ICategory>
  postSaveCategory(body: TPostSaveCategoryRequestBodySchema): Promise<IPostSaveCategoryResponse>
  updateCategory(id: string, body: TPutCategoryRequestBodySchema): Promise<void>
  deleteCategory(id: string): Promise<void>
}