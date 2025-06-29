import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/login', (req, res) => AuthController.login(req, res));
router.post('/register', (req, res) => AuthController.register(req, res));
router.post('/reset-password', (req, res) => AuthController.resetPassword(req, res));
router.post('/refresh-token', (req, res) => AuthController.refreshToken(req, res));

export default router;
