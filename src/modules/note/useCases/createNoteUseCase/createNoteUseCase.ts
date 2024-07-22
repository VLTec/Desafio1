import { Injectable } from '@nestjs/common';
import { Note } from '../../entities/Note';
import { NoteRepository } from '../../repositories/NoteRepository';

interface CreateNoteRequest {
  title: string;
  description: string | null;
  userId: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ title, description, userId }: CreateNoteRequest) {
    const note = new Note({
      title,
      description,
      userId,
    });

    await this.noteRepository.create(note);
    return note;
  }
}
