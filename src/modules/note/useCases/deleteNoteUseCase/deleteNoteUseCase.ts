import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';

@Injectable()
export class DeleteNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: string, userId: string) {
    const note = await this.noteRepository.findById(id, userId);

    if (!note) throw new NoteNotFoundException();
    if (userId != note.userId) throw new NoteNotFoundException();

    await this.noteRepository.delete(id);
  }
}
