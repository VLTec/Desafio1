import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from './modules/mail/mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { NoteModule } from './infra/http/modules/note/note.module';
import { UserModule } from './infra/http/modules/user/user.module';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';

@Module({
  imports: [DatabaseModule, UserModule, NoteModule, AuthModule, MailModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
