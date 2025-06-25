import api from './ApiService';
import { Product } from '../interfaces/ProductInterface';

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    const { data } = await api.get('/products');
    return data;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const all = await this.getAllProducts();
    return all.slice(0, 6);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const { data } = await api.get(`/categories/${categoryId}/products`);
    return data;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const all = await this.getAllProducts();
    return all.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getProductById(id: number): Promise<Product> {
    const { data } = await api.get(`/products/${id}`);
    return data;
  }
}

export default new ProductService();
