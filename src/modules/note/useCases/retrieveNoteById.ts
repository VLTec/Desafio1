import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../../infra/database/prisma/repositories/note/noteRepositoryInterface';
import { Note } from '../entities/noteEntity';

@Injectable()
export class RetrieveNoteByIdUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: number): Promise<Note | null> {
    return this.noteRepository.findOne(id);
  }
}
