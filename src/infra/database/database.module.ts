import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { PrismaUserRepository } from './prisma/repositories/user/PrismaUserRepository';
import { NoteRepository } from 'src/modules/note/repositories/NoteRepository';
import { PrismaNoteRepository } from './prisma/repositories/note/PrismaNoteRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NoteRepository,
      useClass: PrismaNoteRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository, NoteRepository],
})
export class DatabaseModule {}
