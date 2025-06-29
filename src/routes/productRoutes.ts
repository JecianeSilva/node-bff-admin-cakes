import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', (req, res) => ProductController.getAllProducts(req, res));
router.get('/:id', (req, res) => ProductController.getById(req, res));
router.post('/', (req, res) => ProductController.create(req, res));
router.put('/:id', (req, res) => ProductController.update(req, res));
router.delete('/:id', (req, res) => ProductController.remove(req, res));

export default router;
