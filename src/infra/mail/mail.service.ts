import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import path from 'path';

interface SendEmailSchema {
  name: string;
  email: string;
}

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  sendMail({ name, email }: SendEmailSchema) {
    this.mailService.sendMail({
      from: 'kingstorm <dev@gmail.com>',
      to: email,
      subject: 'Nota Criada com Sucesso!',
      text: `Olá ${name}, Estamos enviando este e-mail para informá-lo de que uma nova nota foi criada em sua conta`,
    });
  }
}
