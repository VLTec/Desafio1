import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendNoteCreatedEmail(userEmail: string) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Nota Criada',
      text: 'Sua nota foi criada com sucesso!',
    });
  }
}
