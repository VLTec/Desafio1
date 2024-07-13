import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../entities/Note';
import { sendEmail } from 'src/services/sendMail';

interface CreateNoteRequest {
  title: string;
  content: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ title, content }: CreateNoteRequest) {
    const note = new Note({
      title,
      content,
          });

    await this.noteRepository.create(note);

    sendEmail(note.title); 

    return note;
  }
}
