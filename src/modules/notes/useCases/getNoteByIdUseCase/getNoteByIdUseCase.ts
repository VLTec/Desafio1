import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';

interface GetNoteByIdRequest {
  userId: string;
  noteId: string;
}

@Injectable()
export class GetNoteByIdUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ userId, noteId }: GetNoteByIdRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new Error('Note not found');
    }

    if (note.userId !== userId) {
      throw new Error('Unauthorized');
    }

    return note;
  }
}
