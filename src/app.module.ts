import { Module } from '@nestjs/common';
import { UserModule } from './infra/http/modules/user/user.module';
import { NoteModule } from './infra/http/modules/note/note.module';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465, //google
        ignoreTLS: false,
        secure: true,
        auth: {
          user: process.env.MAIL,
          pass: process.env.MAIL_PASS_SECRET,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      preview: false,
      template: {
        dir: process.cwd() + '/template/',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    DatabaseModule,
    UserModule,
    NoteModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
