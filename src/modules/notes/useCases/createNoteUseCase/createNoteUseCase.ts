import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../entities/Note';

interface CreateNoteRequest {
  title: string;
  description: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ title, description }: CreateNoteRequest) {

    if (!title) {
      throw new Error('Title is required')
    }

    const note = new Note({
      title,
      description
    });

    await this.noteRepository.create(note);

    return note;
  }
}
