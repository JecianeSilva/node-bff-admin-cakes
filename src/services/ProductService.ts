import api from './ApiService';

class ProductService {
  async getAllProducts(token: string, status?: string) {
    const response = await api.get('/products', {
      headers: { Authorization: `Bearer ${token}` },
      params: status ? { status } : {},
    });
    return response.data;
  }

  async getProductById(token: string, id: string) {
    const response = await api.get(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async createProduct(token: string, productData: any) {
    const response = await api.post('/products', productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async updateProduct(token: string, id: string, productData: any) {
    const response = await api.put(`/products/${id}`, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async deleteProduct(token: string, id: string) {
    const response = await api.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}

export default new ProductService();
