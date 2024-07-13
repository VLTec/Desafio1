import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotesService } from '../notes/notes.services';
import { NotesController } from '../notes/notes.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
    imports: [
        MailerModule.forRoot({
        transport: {
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT!, 10),
            secure: false,
            auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
            },
        },
        defaults: {
            from: '"No Reply" <noreply@example.com>',
        },
        template: {
            dir: join(__dirname, '..', 'mail', 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
            strict: true,
            },
        },
        }),
    ],
    controllers: [NotesController],
    providers: [NotesService, PrismaService],
})
export class NotesModule {}