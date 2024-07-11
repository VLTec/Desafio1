import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../repository/noteRepository';
import { NoteBody } from 'src/infra/http/modules/note/dtos/noteBody';

@Injectable()
export class NoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async create({ note, title, description }: NoteBody) {
    const createNote = await this.noteRepository.create({
      note,
      title,
      description,
    });

    return createNote;
  }
}
