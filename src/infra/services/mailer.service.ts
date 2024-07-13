import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "src/modules/user/entities/User";

@Injectable()
export class MailerServices {
    constructor(private mailerService: MailerService) {}

    async sendMail(user: User) {
        await this.mailerService.sendMail({
            from: 'lamorimalvescavalcante@gmail.com',
            to: user.email,
            subject: 'Criação de nota',
            html: [
                `<h1>Olá, ${user.name}</h1>`,
                `<p>Nota criada.</p>`,
            ].join('\n')
        })
    }
}