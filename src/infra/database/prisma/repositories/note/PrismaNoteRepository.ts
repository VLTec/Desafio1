import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Note } from 'src/modules/notes/entities/Note';
import { PrismaNoteMapper } from '../../mappers/note/PrismaNoteMapper';
import { NoteRepository } from 'src/modules/notes/repositories/NoteRepository';

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
  constructor(private prisma: PrismaService) {}

  async create(note: Note): Promise<void> {
    const noteRaw = PrismaNoteMapper.toPrisma(note);

    await this.prisma.note.create({
      data: noteRaw,
    });
  }

  async findAllByUserId(userId: string): Promise<Note[]> {
    const notes = await this.prisma.note.findMany({
      where: {
        userId,
      },
    });

    return notes.map(PrismaNoteMapper.toDomain);
  }

  async findById(id: string): Promise<Note | null> {
    const note = await this.prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!note) return null;

    return PrismaNoteMapper.toDomain(note);
  }

  async update(note: Note): Promise<void> {
    const data = PrismaNoteMapper.toPrisma(note);

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
