import api from './ApiService';

class ProductService {
   async getAllProducts(accessToken: string) {

    if (!accessToken) {
      throw new Error('Authentication token is required');
    }
    const { data } = await api.get('/products', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return data;
  }
}

export default new ProductService();
