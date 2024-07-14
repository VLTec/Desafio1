import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../../infra/database/prisma/repositories/note/noteRepositoryInterface';

@Injectable()
export class DeleteNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: number): Promise<void> {
    return this.noteRepository.delete(id);
  }
}
