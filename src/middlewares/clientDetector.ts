import { Request, Response, NextFunction } from 'express';

export const clientDetector = (req: Request, res: Response, next: NextFunction): void => {
  const userAgent = req.headers['user-agent'] || '';

  const isMobile = userAgent.toLowerCase().includes('mobile');

  req.clientType = isMobile ? 'mobile' : 'web';

  next();
};

declare global {
  namespace Express {
    interface Request {
      clientType: 'web' | 'mobile';
    }
  }
}
