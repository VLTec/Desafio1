import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './infra/http/modules/user/user.module';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { NoteModule } from './infra/http/modules/note/note.module';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';

//import { MailerModule } from '@nestjs-modules/mailer';
import { env } from './env';

@Module({
  imports: [DatabaseModule, UserModule, NoteModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
