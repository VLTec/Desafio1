import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { NoteRepository } from 'src/modules/notes/repositories/NoteRepository';
import { PrismaNoteRepository } from './prisma/repositories/note/PrismaNoteRepository';
import { PrismaUserRepository } from './prisma/repositories/user/PrismaUserRepository';

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
