import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from './config';

@Module({
  imports: [MailerModule.forRoot(config)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
