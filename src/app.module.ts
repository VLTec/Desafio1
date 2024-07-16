import { Module } from '@nestjs/common';
import { UserModule } from './infra/http/modules/user/user.module';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';

import { env } from './env';

import { ConfigModule } from '@nestjs/config'
import { NoteModule } from './infra/http/modules/note/note.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: env.NODE_ENV === 'development' ? '.env.development' : '.env'
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    NoteModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
