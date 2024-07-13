import { Injectable } from '@nestjs/common';
import { INoteRepository } from '../../repositories/NoteRepository';
import { NoteException } from '../../exception/NoteException';

interface IUpdateNoteRequest {
  id: string;
  title?: string;
  description?: string;
}

@Injectable()
export class UpdateNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute({ id, title, description }: IUpdateNoteRequest) {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      throw new NoteException('Nota não foi encontrada');
    }

    if (!title || title?.trim() == '') {
      throw new NoteException('Titulo não pode ser vazio');
    }

    note.title = title;
    note.description = description || '';

    await this.noteRepository.update(note);

    return note;
  }
}
