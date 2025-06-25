import { Request, Response, NextFunction } from 'express';

export const clientDetector = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.headers['user-agent'];
  
  if (userAgent?.toLowerCase().includes('mobile')) {
    req.clientType = 'mobile';
  } else {
    req.clientType = 'web';
  }
  
  next();
};

// Para TypeScript, adicione a declaração de tipos:
declare global {
  namespace Express {
    interface Request {
      clientType: 'web' | 'mobile';
    }
  }
}