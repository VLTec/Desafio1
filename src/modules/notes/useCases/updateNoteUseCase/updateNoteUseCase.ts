import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';

interface UpdateNoteRequest {
  userId: string;
  noteId: string;
  title: string;
  description: string;
}

@Injectable()
export class UpdateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ userId, noteId, title, description }: UpdateNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new Error('Note not found');
    }

    if (note.userId !== userId) {
      throw new Error('Unauthorized');
    }

    note.title = title;
    note.description = description;

    return await this.noteRepository.update(note);
  }
}
