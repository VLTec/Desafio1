import { env } from 'src/env';
import { MailerOptions } from '@nestjs-modules/mailer';

export const config: MailerOptions = {
  transport: {
    host: env.SMTP_HOST,
    auth: {
      user: env.SMTP_USERNAME,
      pass: env.SMTP_PASSWORD,
    },
  },
};
