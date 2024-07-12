require('dotenv').config();
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRE: z.string(),
  MAIL_TOKEN: z.string(),
  MAIL_ENDPOINT: z.string(),
  EMAIL_TO: z.string(),
});

export const env = envSchema.parse(process.env);
