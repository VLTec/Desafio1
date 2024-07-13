import { Injectable } from '@nestjs/common';
import { INoteRepository } from '../../repositories/NoteRepository';

@Injectable()
export class GetAllNotesUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute() {
    const notes = await this.noteRepository.findAll();

    return notes;
  }
}
