import * as dotenv from 'dotenv';

dotenv.config();
export default () => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
  contexto: process.env.CONTEXTO || '',
});
