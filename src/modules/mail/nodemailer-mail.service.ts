import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { MailService, SendMailProps } from './mail-service'
import { env } from 'src/env'

@Injectable()
export class NodemailerMailService implements MailService {
    private transporter: nodemailer.Transporter
    
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.SMTP_PROVIDER_HOST,
            port: env.SMTP_PROVIDER_PORT,
            auth: {
                user: env.SMTP_PROVIDER_USER,
                pass: env.SMTP_PROVIDER_PASSWORD
            },
        })
    }

    async sendMail({ subject, content, to }: SendMailProps): Promise<any> {
        return this.transporter.sendMail({
            to,
            subject,
            html: content
        })
    }
}