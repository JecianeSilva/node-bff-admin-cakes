import 'dotenv/config'
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('localhost'),
  JWT_SECRET: z.string().min(1),
  API_BASE_URL: z.string().url({ message: 'API_BASE_URL deve ser uma URL válida' }),
  CONTEXTO: z.string().default('/cakes-bff'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables.');
}

const CONFIG = {
  APP: {
    API_BASE_URL: _env.data.API_BASE_URL,
    CONTEXTO: _env.data.CONTEXTO,
    PORT: _env.data.PORT,
    HOST: _env.data.HOST,
    ENV: _env.data.NODE_ENV,
  },
  AUTH: {
    JWT_SECRET: _env.data.JWT_SECRET,
  },
};

export default CONFIG;
