import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT || 2525,
  user: process.env.MAIL_USER,
  password: process.env.MAIL_PASSWORD,
  ignoreTLS: process.env.MAIL_IGNORE_TLS,
  secure: process.env.MAIL_SECURE,
  requireTLS: process.env.MAIL_REQUIRE_TLS,
  defaultEmail: process.env.MAIL_DEFAULT_EMAIL,
  defaultName: process.env.MAIL_DEFAULT_NAME,
  clientPort: process.env.MAIL_CLIENT_PORT,
}));
