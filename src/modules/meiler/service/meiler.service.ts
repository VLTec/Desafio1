import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail, { Address } from 'nodemailer/lib/mailer';

interface SendEmailDTO {
  from: Address,
  recipients: Address[],
  subject: string,
  html: string,
  text?: string,
  placeholderReplacements?: Record<string, string>
}

@Injectable()
export class MeilerService {
  constructor(private readonly configService: ConfigService) {}
    mailTransport() {
      const transporter = nodemailer.createTransport({
        host: this.configService.get<string>('MAIL_HOST'),
        port: this.configService.get<number>('MAIL_PORT'),
        secure: false,
        auth: {
          user: this.configService.get<string>('MAIL_USER'),
          pass: this.configService.get<string>('MAIL_PASSWORD'),
        },
      });

      return transporter
    }

  async sendEmail(dto: SendEmailDTO) {
    const { from, recipients, subject, html, placeholderReplacements, text} = dto

    const transport = this.mailTransport();

    const options: Mail.Options = {
      from,
      to: recipients,
      subject,
      html,
    }

    try {
      const result = await transport.sendMail(options);
      return result
    } catch (err) {
      console.log('err sendMail=>> ', err);
    }
  }
}