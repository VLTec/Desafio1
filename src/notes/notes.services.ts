import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Note, Prisma } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async createNote(data: Prisma.NoteCreateInput): Promise<Note> {
    let user = await this.prisma.user.findUnique({
      where: { id: 1 },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          name: 'Default User',
          email: 'default@example.com',
          password: 'defaultpass'
        },
      });
    }

    const note = await this.prisma.note.create({
      data: {
        ...data,
        user: {
          connect: { id: user.id },
        },
      },
    });

    await this.mailerService.sendMail({
      to: 'user@example.com',
      subject: 'Nota Criada',
      template: './note-created',
      context: {
        title: note.title,
        description: note.description,
      },
    });

    return note;
  }

  async getNotes(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  async getNoteById(id: number): Promise<Note> {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!note) {
      throw new Error(`Note with id ${id} not found`);
    }

    return note;
  }

  async updateNote(id: number, data: Prisma.NoteUpdateInput): Promise<Note> {
    return this.prisma.note.update({
      where: { id },
      data,
    });
  }

  async deleteNote(id: number): Promise<void> {
    await this.prisma.note.delete({
      where: { id },
    });
  }
}