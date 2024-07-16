import { Module } from '@nestjs/common';
import { MailService } from 'src/modules/mail/mail-service';
import { NodemailerMailService } from './nodemailer-mail.service';

@Module({
  providers: [
    {
      provide: MailService,
      useClass: NodemailerMailService
    }
  ],
  exports: [
    MailService
  ]
})
export class MailModule {}
