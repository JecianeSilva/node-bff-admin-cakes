import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  apiBaseUrl: process.env.API_BASE_URL || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || ''
};