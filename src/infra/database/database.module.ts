import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { PrismaUserRepository } from './prisma/repositories/user/PrismaUserRepository';
import { PrismaNoteRepository } from './prisma/repositories/notes/PrismaNotesRepository';

import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { NoteRepository } from 'src/modules/notes/repositories/NoteRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: NoteRepository,
      useClass: PrismaNoteRepository,
    },
  ],
  exports: [UserRepository, NoteRepository],
})
export class DatabaseModule {}
