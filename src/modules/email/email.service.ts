import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'your-email@example.com',
        pass: 'your-password',
      },
    });
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const templatePath = path.join(__dirname, 'templates', 'welcome.hbs');
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    
    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Welcome to Our App!',
      html: templateContent.replace('{{name}}', name),
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendNotificationEmail(email: string, message: string): Promise<void> {
    const templatePath = path.join(__dirname, 'templates', 'notification.hbs');
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    
    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Notification from Our App',
      html: templateContent.replace('{{message}}', message),
    };

    await this.transporter.sendMail(mailOptions);
  }
}
