import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ error: 'Token ausente' });
    return;
  }

  const [bearer, token] = header.split(' ');

  if (bearer !== 'Bearer' || !token) {
    res.status(401).json({ error: 'Formato de token inválido' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
