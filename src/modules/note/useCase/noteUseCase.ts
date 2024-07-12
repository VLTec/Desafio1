import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../repository/noteRepository';
import { NoteBody } from 'src/infra/http/modules/note/dtos/noteBody';

@Injectable()
export class NoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async create({ note, title, description, user_id }: NoteBody) {
    const createNote = await this.noteRepository.create({
      user_id,
      note,
      title,
      description,
    });

    return createNote;
  }

  async findAll(user_id: string) {
    const allNotes = await this.noteRepository.findAll(user_id);

    return allNotes;
  }
}
