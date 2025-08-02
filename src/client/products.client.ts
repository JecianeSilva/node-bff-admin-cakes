import { IProductsClient } from './interfaces/ProductInterface';
import { IHttpClientService } from '../service/http-client.service';
import { Inject, Injectable } from "@nestjs/common";
import { queryString } from '../utils/queryString';
import { IPostSaveProductResponse, IProduct, TGetProductQueryParams, TGetProductsResponse, TPostSaveProductRequestBody, TPutProductRequestBody } from 'cakes-lib-types-js';
import FormData from 'form-data';

@Injectable()
export class ProductsClient implements IProductsClient {
  constructor(
    @Inject('IHttpClientService')
    private readonly HttpClientService: IHttpClientService
  ) {}

  async getProducts(queryParams: TGetProductQueryParams, ): Promise<TGetProductsResponse> {
    const { data } = await this.HttpClientService.get<TGetProductsResponse>(
      `${process.env.API_BASE_URL}/products?${queryString.encode(queryParams)}`,
    )
    return data
  }

  async getProductById(id: string): Promise<IProduct> {
    const { data } = await this.HttpClientService.get<IProduct>(
      `${process.env.API_BASE_URL}/products/${id}`,
    )
    return data
  }

  async postSaveProduct(body: TPostSaveProductRequestBody, image: any): Promise<IPostSaveProductResponse> {
    const formData = new FormData();
    formData.append('name', body.name);
    formData.append('price', body.price);
    formData.append('categoryId', body.categoryId);

    if (body.description) {
      formData.append('description', body.description);
    }
    if (body.flavor) {
      formData.append('flavor', body.flavor);
    }
    if (body.size) {
      formData.append('size', body.size);
    }
    if (body.filling) {
      formData.append('filling', body.filling);
    }
    if (body.dough) {
      formData.append('dough', body.dough);
    }
    if (body.status) {
      formData.append('status', body.status);
    }

    if (image) {
      formData.append('image', image.buffer, image.originalname);
    }
    const { data } = await this.HttpClientService.post<IPostSaveProductResponse>(
      `${process.env.API_BASE_URL}/products/`,
      formData, {
        headers: {
          ...formData.getHeaders(),
        }
      }
    )
    return data
  }

  async updatedProduct(id: string, body: TPutProductRequestBody, image: any): Promise<void> {
      
    const formData = new FormData();
    if (body.name) formData.append('name', body.name);
    if (body.description) formData.append('description', body.description);
    if (body.price) formData.append('price', body.price);
    if (body.categoryId) formData.append('categoryId', body.categoryId);
    if (body.description) formData.append('description', body.description);
    if (body.flavor) formData.append('flavor', body.flavor);
    if (body.size) formData.append('size', body.size);
    if (body.filling) formData.append('filling', body.filling); 
    if (body.dough) formData.append('dough', body.dough);
    if (body.status) formData.append('status', body.status);
    
    if (image) {
      formData.append('image', image.buffer, image.originalname);
    }
    const { data } = await this.HttpClientService.put<void>(
        `${process.env.API_BASE_URL}/products/${id}`,
        body
      )
      return data
  }

  async deleteProduct(id: string): Promise<void> {
      const { data } = await this.HttpClientService.delete<void>(
        `${process.env.API_BASE_URL}/products/${id}`,
      )
      return data
  }
}