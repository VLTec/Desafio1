import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../entities/Note';

@Injectable()
export class GetNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: string): Promise<Note> {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }

    return note;
  }
}
