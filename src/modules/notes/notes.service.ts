import { Injectable } from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from './note.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotesService {
  private readonly notes: CreateNoteDto[] = [];

  constructor(private readonly mailerService: MailerService) {}

  create(createNoteDto: CreateNoteDto, userEmail: string) {
    const newNote = {
      ...createNoteDto,
      id: (this.notes.length + 1).toString(),
      createdAt: new Date(),
    };
    this.notes.push(newNote);

    this.sendEmailOnCreate(newNote, userEmail); // Chame o método para enviar e-mail

    return newNote;
  }

  async sendEmailOnCreate(newNote: CreateNoteDto, userEmail: string) {
    try {
      await this.mailerService.sendMail({
        to: userEmail, // Use o e-mail do usuário autenticado
        subject: 'Nova nota criada',
        text: `Uma nova nota foi criada com título: ${newNote.title}`,
      });
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  }

  findAll() {
    return this.notes;
  }

  findOne(id: string) {
    return this.notes.find(note => note.id === id);
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      return null;
    }

    this.notes[noteIndex] = {
      ...this.notes[noteIndex],
      ...updateNoteDto,
    };

    return this.notes[noteIndex];
  }

  remove(id: string) {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      return null;
    }
    const deletedNote = this.notes.splice(noteIndex, 1);
    return deletedNote[0];
  }
}
