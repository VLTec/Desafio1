import { Injectable } from '@nestjs/common';

import { NoteRepository } from '../../repositories/NoteRepository';

interface GetNoteByIdRequest {
  id: string;
}

@Injectable()
export class GetNoteByIdUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ id }: GetNoteByIdRequest) {

    if (!id) {
      throw new Error('id is required')
    }

    const notes = await this.noteRepository.findById(id);

    return notes;
  }
}
