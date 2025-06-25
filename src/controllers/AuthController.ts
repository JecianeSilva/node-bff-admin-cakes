import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const auth = await AuthService.login(email, password);
      res.json(auth);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro no login';
      res.status(401).json({ error: message });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const newUser = await AuthService.register(req.body);
      res.status(201).json(newUser);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro no registro';
      res.status(400).json({ error: message });
    }
  }
}

export default new AuthController();
