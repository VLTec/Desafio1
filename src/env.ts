import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRE: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
