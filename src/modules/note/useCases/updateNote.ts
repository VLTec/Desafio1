import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../../infra/database/prisma/repositories/note/noteRepositoryInterface';
import { UpdateNoteDto } from '../dtos/updateNote.dto';
import { Note } from '../entities/noteEntity';

@Injectable()
export class UpdateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: number, data: UpdateNoteDto): Promise<Note> {
    return this.noteRepository.update(id, data);
  }
}
