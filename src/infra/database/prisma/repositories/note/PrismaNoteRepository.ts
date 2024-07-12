import { Injectable } from '@nestjs/common';
import { Note } from 'src/modules/note/entities/Note';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaNoteRepository {
  constructor(private prisma: PrismaService) {}
  async create(notes: Note) {
    const newNote = await this.prisma.note.create({
      data: {
        user_id: notes.user_id,
        note: notes.note,
        title: notes.title,
        description: notes.description,
      },
    });

    return newNote;
  }

  async findAll(user_id: string) {
    const allNotes = await this.prisma.note.findMany({
      where: {
        user_id: user_id,
      },
    });

    return allNotes;
  }

  async findOne(id: number) {
    const note = await this.prisma.note.findUnique({
      where: {
        id: id,
      },
    });

    return note;
  }
}
