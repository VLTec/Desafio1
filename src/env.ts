import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRE: z.string(),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.string(),
  MAIL_USER: z.string(),
  MAIL_PASSWORD: z.string(),
  MAIL_IGNORE_TLS: z.string(),
  MAIL_SECURE: z.string(),
  MAIL_REQUIRE_TLS: z.string(),
  MAIL_DEFAULT_EMAIL: z.string().email(),
  MAIL_DEFAULT_NAME: z.string(),
  MAIL_CLIENT_PORT: z.string(),
});

export const env = envSchema.parse(process.env);
