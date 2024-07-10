import { Injectable } from '@nestjs/common';

import { Note } from '../../entities/Note';
import { NoteRepository } from '../../repositories/NoteRepository';

interface CreateNoteRequest {
  title: string;
  description: string;
  user_id: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ title, description, user_id }: CreateNoteRequest) {

    if (!title) {
      throw new Error('Title is required')
    }

    const note = new Note({
      title,
      description,
      user_id,
    });

    await this.noteRepository.create(note);

    return note;
  }
}
