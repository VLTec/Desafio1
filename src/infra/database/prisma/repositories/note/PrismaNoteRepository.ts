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

  async findAll(userId: string): Promise<Note[] | []> {
    const notes = await this.prisma.note.findMany({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return notes.map((note) => PrismaNoteMapper.toDomain(note));
  }

  async findById(id: string, userId: string): Promise<Note | null> {
    const note = await this.prisma.note.findUnique({
      where: {
        id: id,
        AND: {
          userId,
        },
      },
    });

    if (!note) return null;

    return PrismaNoteMapper.toDomain(note);
  }

  async update(data: Note) {
    const note = PrismaNoteMapper.toPrisma(data);

    await this.prisma.note.update({
      data: note,
      where: {
        id: note.id,
      },
    });
  }
}
