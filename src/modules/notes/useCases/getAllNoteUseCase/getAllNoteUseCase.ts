import { Injectable } from '@nestjs/common';

import { NoteRepository } from '../../repositories/NoteRepository';

interface GetAllNoteRequest {
  user_id: string;
}

@Injectable()
export class GetAllNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ user_id }: GetAllNoteRequest) {

    if (!user_id) {
      throw new Error('UserId is required')
    }

    const notes = await this.noteRepository.findAll(user_id);

    return notes;
  }
}
