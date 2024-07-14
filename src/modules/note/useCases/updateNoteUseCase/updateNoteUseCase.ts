import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../entities/Note';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';

interface UpdateNoteRequest {
  id: string;
  title: string;
  description?: string;
}

@Injectable()
export class UpdateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ id, title, description }: UpdateNoteRequest): Promise<Note> {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      throw new NoteNotFoundException();
    }

    if (title !== undefined) {
      note.title = title;
    }

    if (description !== undefined) {
      note.description = description;
    }

    await this.noteRepository.update(note);

    return note;
  }
}
