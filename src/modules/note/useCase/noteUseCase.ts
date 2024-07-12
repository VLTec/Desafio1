import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteRepository } from '../repository/noteRepository';
import {
  NoteBody,
  NoteUpdateBody,
} from 'src/infra/http/modules/note/dtos/noteBody';
import { NoteNotFoundException } from '../exceptions/NoteNotFound';

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

  async findOne(id: number) {
    const note = await this.noteRepository.findOne(id);

    if (!note) throw new NoteNotFoundException();

    return note;
  }

  async update({ id, note, title, description }: NoteUpdateBody) {
    const existNote = await this.noteRepository.findOne(id);

    if (!existNote) throw new NoteNotFoundException();

    const updateNote = await this.noteRepository.update({
      id,
      note,
      title,
      description,
    });

    return updateNote;
  }

  async delete(id: number) {
    const existNote = await this.noteRepository.findOne(id);

    if (!existNote) throw new NoteNotFoundException();

    return this.noteRepository.delete(id);
  }
}
