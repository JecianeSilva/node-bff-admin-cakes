import { Response } from 'express';
import ProductService from '../services/ProductService';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

class ProductController {
  async getAllProducts(req: AuthenticatedRequest, res: Response) {
    const token = req.accessToken;

    try {
      const products = await ProductService.getAllProducts(token);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
    }
  }
}

export default new ProductController();
