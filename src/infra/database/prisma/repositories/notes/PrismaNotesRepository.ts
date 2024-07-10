import { Note } from 'src/modules/notes/entities/Note';
import { NoteRepository } from 'src/modules/notes/repositories/NoteRepository';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PrismaNotesMapper } from '../../mappers/notes/PrismaNotesMapper';

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
  constructor(private prisma: PrismaService) {}
  async create(note: Note): Promise<void> {
    const noteRaw = PrismaNotesMapper.toPrisma(note);

    await this.prisma.note.create({
      data: noteRaw,
    });
  }

  async findAll(): Promise<void> {
    await this.prisma.note.findMany()
  }

  async findById(id: string): Promise<Note | null> {
    const note = await this.prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!note) return null;

    return PrismaNotesMapper.toDomain(note);
  }

  async update(note: Note): Promise<void> {
    const data = PrismaNotesMapper.toPrisma(note);

    await this.prisma.note.update({
      where: {
        id: note.id,
      },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.note.delete({
      where: {
        id,
      },
    });
  }
}
