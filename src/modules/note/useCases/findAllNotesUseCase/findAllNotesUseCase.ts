import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';

interface FindAllNoteRequest {
  userId: string;
}

@Injectable()
export class FindAllNotesUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ userId }: FindAllNoteRequest) {
    const notes = await this.noteRepository.findAll(userId);

    return notes;
  }
}
