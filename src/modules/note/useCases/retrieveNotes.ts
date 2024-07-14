import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../../infra/database/prisma/repositories/note/noteRepositoryInterface';
import { Note } from '../entities/noteEntity';

@Injectable()
export class RetrieveNotesUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(): Promise<Note[]> {
    return this.noteRepository.findAll();
  }
}
