import { Request, Response } from 'express';
import { loginSchema, refreshTokenSchema, registerSchema, resetPasswordSchema } from 'cakes-lib-types-js';
import AuthService from '../services/AuthService';

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const credentials = loginSchema.parse(req.body);
      const result = await AuthService.login(credentials.email, credentials.password);
      res.status(200).json(result);
    } catch (err: any) {
      handleError(err, res);
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const data = registerSchema.parse(req.body);
      const result = await AuthService.register(data);
      res.status(201).json(result);
    } catch (err: any) {
      handleError(err, res);
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const data = resetPasswordSchema.parse(req.body);
      const result = await AuthService.resetPassword(data.email, data.newPassword);
      res.status(200).json(result);
    } catch (err: any) {
      handleError(err, res);
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = refreshTokenSchema.parse(req.body);
      const result = await AuthService.refreshToken(refreshToken);
      res.status(200).json(result);
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

export default new AuthController();
