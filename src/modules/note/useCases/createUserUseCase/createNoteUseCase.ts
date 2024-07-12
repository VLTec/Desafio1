import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../entities/Note';
// import { MailerService } from '@nestjs-modules/mailer';

interface CreateNoteRequest {
  title: string;
  content: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(
    private noteRepository: NoteRepository,
    // private mailerService: MailerService,
  ) {}

  async execute({ title, content }: CreateNoteRequest) {
    const note = new Note({
      title,
      content,
    });

    await this.noteRepository.create(note);

    // await this.mailerService.sendMail({
    //   to: 'brunotorresreal@gmail.com',
    //   subject: 'Nota criada',
    //   text: 'Nota criada',
    // });

    return note;
  }
}