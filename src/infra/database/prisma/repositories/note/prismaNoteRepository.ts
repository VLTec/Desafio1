import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../infra/database/prisma/prisma.service';
import { NoteRepository } from '../note/noteRepositoryInterface';
import { CreateNoteDto } from '../../../../../modules/note/dtos/createNote.dto';
import { UpdateNoteDto } from '../../../../../modules/note/dtos/updateNote.dto';
import { Note } from '../../../../../modules/note/entities/noteEntity';

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateNoteDto): Promise<Note> {
    return this.prisma.note.create({ data }) as Promise<Note>;
  }

  async findAll(): Promise<Note[]> {
    return this.prisma.note.findMany() as Promise<Note[]>;
  }

  async findOne(id: string): Promise<Note | null> {
    return this.prisma.note.findUnique({ where: { id } }) as Promise<Note | null>;
  }

  async update(id: string, data: UpdateNoteDto): Promise<Note> {
    return this.prisma.note.update({
      where: { id },
      data,
    }) as Promise<Note>;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.note.delete({ where: { id } });
  }
}
