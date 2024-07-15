import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRE: z.string(),
  NODE_ENV: z.enum(['development', 'production']).optional().default('production'),
});

export const env = envSchema.parse(process.env);
