import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  accessToken: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Missing token' });
    return;
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    res.status(401).json({ error: 'Invalid token format' });
    return;
  }

    (req as AuthenticatedRequest).accessToken = token;

  next();
};
