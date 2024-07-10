import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../entities/Note';

interface CreateNoteRequest {
  userId: string;
  title: string;
  description: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ userId, title, description }: CreateNoteRequest) {
    const note = new Note({
      userId,
      title,
      description,
    });

    await this.noteRepository.create(note);

    return note;
  }
}
