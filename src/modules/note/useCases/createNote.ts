import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../../infra/database/prisma/repositories/note/noteRepositoryInterface';
import { CreateNoteDto } from '../dtos/createNote.dto';
import { Note } from '../entities/noteEntity';

@Injectable()
export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(data: CreateNoteDto): Promise<Note> {
    return this.noteRepository.create(data);
  }
}
