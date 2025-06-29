import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import ProductService from '../services/ProductService';

class ProductController {
  async getAllProducts(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { status } = req.query;
      if (!status) {
        res.status(400).json({ error: 'Invalid status filter' });
      }

      const products = await ProductService.getAllProducts(req.accessToken, status as string);
      res.status(200).json(products);
    } catch (err: any) {
      handleError(err, res);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(req.accessToken, id);
      res.json(product);
    } catch (err: any) {
      handleError(err, res);
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const data = req.body;
      const created = await ProductService.createProduct(req.accessToken, data);
      res.status(201).json(created);
    } catch (err: any) {
      handleError(err, res);
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await ProductService.updateProduct(req.accessToken, id, data);
      res.json(updated);
    } catch (err: any) {
      handleError(err, res);
    }
  }

  async remove(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(req.accessToken, id);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err: any) {
      handleError(err, res);
    }
  }
}

function handleError(err: any, res: Response): void {
  if (err?.name === 'ZodError') {
    res.status(400).json({
      error: err.errors.map((e: any) => e.message).join(', ')
    });
  }

  const status = err?.response?.status || err?.status || 500;
  const message = err?.response?.data?.error || err?.message || 'Internal Server Error';

  res.status(status).json({ error: message });
}

export default new ProductController();
