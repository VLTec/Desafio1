// mailtrapEmailService.ts
import nodemailer from 'nodemailer';
import { EmailService, EmailStructure } from './emailService';
import { EmailServiceException } from './exception/EmailServiceException';

export class MailtrapEmailService implements EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'api', 
        pass: '392c5019112d4238a2f96d5fad368e4d', // Credebcuais sempre em um .env
      },
    });
  }

  async sendEmail({ to, subject, text }: EmailStructure): Promise<void> {
    const mailOptions = {
      from: 'teste@gmail.com',
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new EmailServiceException((error as Error).message);
    }
  }
}
