import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRE: z.string(),
  NODE_ENV: z.enum(['development', 'production']).optional().default('production'),
  SMTP_PROVIDER_HOST: z.string(),
  SMTP_PROVIDER_PORT: z.coerce.number(),
  SMTP_PROVIDER_USER: z.string(),
  SMTP_PROVIDER_PASSWORD: z.string()
});

export const env = envSchema.parse(process.env);
