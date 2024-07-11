import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';

interface RemoveNoteByIdRequest {
  userId: string;
  noteId: string;
}

@Injectable()
export class RemoveNoteByIdUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ userId, noteId }: RemoveNoteByIdRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new Error('Note not found');
    }

    if (note.userId !== userId) {
      throw new Error('Unauthorized');
    }

    return await this.noteRepository.delete(noteId);
  }
}
