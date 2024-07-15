import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';

@Injectable()
export class FindByIdNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: string, userId: string) {
    const note = await this.noteRepository.findById(id, userId);

    if (!note) throw new NoteNotFoundException();

    return note;
  }
}
