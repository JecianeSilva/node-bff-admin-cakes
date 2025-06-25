import { Request, Response } from 'express';
import ProductService from '../services/ProductService';

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      res.status(500).json({ error: message });
    }
  }

  async getFeaturedProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getFeaturedProducts();
      res.json(products);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      res.status(500).json({ error: message });
    }
  }

  async getProductsByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const products = await ProductService.getProductsByCategory(+categoryId);
      res.json(products);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      res.status(500).json({ error: message });
    }
  }

  async searchProducts(req: Request, res: Response) {
    try {
      const { q } = req.query;
      const products = await ProductService.searchProducts(q as string);
      res.json(products);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      res.status(500).json({ error: message });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(+id);
      if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
      res.json(product);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      res.status(500).json({ error: message });
    }
  }
}

export default new ProductController();
