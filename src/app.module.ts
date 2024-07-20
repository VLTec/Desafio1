import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './infra/http/modules/user/user.module';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';

import { MailerModule } from '@nestjs-modules/mailer';
import { env } from './env';
import { NoteModule } from './infra/http/modules/note/note.module';
import { AuthMiddleware } from './infra/http/modules/auth/middleware/auth.middleware';
@Module({
  imports: [DatabaseModule, UserModule, NoteModule, AuthModule, 
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS
        }
      }
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'notes', method: RequestMethod.GET },
      );
  }
}
