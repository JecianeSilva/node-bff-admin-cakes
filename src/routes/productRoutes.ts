import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { authenticate, AuthenticatedRequest } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', (req, res) => {
  return ProductController.getAllProducts(req as unknown as AuthenticatedRequest, res);
});

// router.get('/featured', ProductController.getFeaturedProducts);
// router.get('/category/:categoryId', ProductController.getProductsByCategory);
// router.get('/search', ProductController.searchProducts);

export default router;
