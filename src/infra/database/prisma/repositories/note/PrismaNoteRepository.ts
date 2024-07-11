import { Injectable } from '@nestjs/common';
import { Note } from 'src/modules/note/entities/Note';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaNoteRepository {
  constructor(private prisma: PrismaService) {}
  async create(note: Note) {
    const newNote = await this.prisma.note.create({
      data: {
        note: note.note,
        title: note.title,
        description: note.description,
      },
    });

    return newNote;
  }
}
