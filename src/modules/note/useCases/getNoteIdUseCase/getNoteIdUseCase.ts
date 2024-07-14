import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../entities/Note';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';

interface GetNoteIdRequest {
  id: string;
}

@Injectable()
export class GetNoteIdUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ id }: GetNoteIdRequest): Promise<Note> {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      throw new NoteNotFoundException();
    }

    return note;
  }
}
