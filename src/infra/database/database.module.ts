import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/user/PrismaUserRepository';

import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { NoteRepository } from 'src/modules/notes/repositories/NoteRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository, NoteRepository],
})
export class DatabaseModule {}
