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

  async findAll(notes: Note) {
    const allNotes = await this.prisma.note.findMany({
      where: {
        user_id: notes.user_id,
      },
    });

    return allNotes;
  }
}
