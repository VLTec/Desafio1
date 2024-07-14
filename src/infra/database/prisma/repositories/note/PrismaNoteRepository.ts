import { Injectable } from '@nestjs/common';
import { NoteRepository } from 'src/modules/note/repositories/NoteRepository';
import { PrismaService } from '../../prisma.service';
import { Note } from 'src/modules/note/entities/Note';
import { PrismaNoteMapper } from '../../mappers/note/PrismaNoteMapper';

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
  constructor(private prisma: PrismaService) {}

  async create(note: Note): Promise<void> {
    const noteRaw = PrismaNoteMapper.toPrisma(note);

    await this.prisma.note.create({
      data: noteRaw,
    });
  }
}
