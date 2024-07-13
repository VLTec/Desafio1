import { Injectable } from '@nestjs/common';
import { Note } from 'src/modules/note/entities/Note';
import { PrismaNotesMapper } from '../../mappers/notes/PrismaNotesMapper';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaNoteRepository {
  constructor(private prisma: PrismaService) {}
  async create(notes: Note) {
    const noteRaw = PrismaNotesMapper.toCreate(notes);

    const createNote = await this.prisma.note.create({
      data: noteRaw,
    });

    return createNote;
  }

  async findAll(user_id: string) {
    const allNotes = await this.prisma.note.findMany({
      where: {
        user_id: user_id,
      },
    });

    return allNotes;
  }

  async findById(id: string) {
    const note = await this.prisma.note.findUnique({
      where: {
        id: id,
      },
    });

    return note;
  }

  async update(notes: Note) {
    const noteUpdate = await this.prisma.note.update({
      where: {
        id: notes.id,
      },
      data: {
        note: notes.note,
        title: notes.title,
        description: notes.description,
      },
    });

    return noteUpdate;
  }

  async delete(id: string) {
    const deleteNote = await this.prisma.note.delete({
      where: {
        id: id,
      },
    });

    return deleteNote;
  }
}
