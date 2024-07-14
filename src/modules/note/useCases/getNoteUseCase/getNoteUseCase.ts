import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../entities/Note';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';

@Injectable()
export class GetNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(): Promise<Note[]> {
    const notes = await this.noteRepository.findAll();

    if (!notes || notes.length === 0) {
      throw new NoteNotFoundException();
    }

    return notes;
  }
}
