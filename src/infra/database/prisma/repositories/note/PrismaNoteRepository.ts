import { Injectable } from '@nestjs/common';
import { NoteRepository } from 'src/modules/note/repositories/NoteRepository';
import { Note } from 'src/modules/note/entities/Note';
import { PrismaNoteMapper } from '../../mappers/note/PrismaNoteMapper';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
  constructor(private prisma: PrismaService) {}

  async create(note: Note): Promise<void> {
    const noteRaw = PrismaNoteMapper.toPrisma(note);

    await this.prisma.note.create({
      data: noteRaw,
    });
  }

  async findById(id: string): Promise<Note | null> {
    const noteRaw = await this.prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!noteRaw) return null;

    return PrismaNoteMapper.toDomain(noteRaw);
  }

  async findAll(): Promise<Note[]> {
    const notesRaw = await this.prisma.note.findMany();

    return notesRaw.map((noteRaw) => PrismaNoteMapper.toDomain(noteRaw));
  }

  async update(note: Note): Promise<void> {
    const noteRaw = PrismaNoteMapper.toPrisma(note);

    await this.prisma.note.update({
      where: {
        id: note.id,
      },
      data: noteRaw,
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
