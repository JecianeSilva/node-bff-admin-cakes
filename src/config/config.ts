import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().optional().default('3000'),
  API_BASE_URL: z.string().url({ message: 'API_BASE_URL deve ser uma URL válida' }),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  JWT_SECRET: z.string().min(10, 'JWT_SECRET precisa ter pelo menos 10 caracteres')
});

const env = envSchema.parse(process.env);

export default {
  port: Number(env.PORT),
  apiBaseUrl: env.API_BASE_URL,
  nodeEnv: env.NODE_ENV,
  jwtSecret: env.JWT_SECRET
};
