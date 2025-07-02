export interface IGetProductsResponse {
  products: IProduct
}
export interface IProductsClient {
  getProducts(active: boolean): Promise<IGetProductsResponse>
}
export interface IProductService {
  getProducts(active: boolean): Promise<IGetProductsResponse>
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  available: boolean;
}