import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';

import { UserModule } from './infra/http/modules/user/user.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { NotesModule } from './infra/http/modules/notes/notes.module';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';

import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { env } from './env';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    AuthModule,
    NotesModule,
    MailerModule
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
