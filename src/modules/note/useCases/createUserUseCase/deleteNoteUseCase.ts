import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';

@Injectable()
export class DeleteNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: string) {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }

    await this.noteRepository.delete(id);
  }
}
