import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';

interface GetAllUserNotesRequest {
  userId: string;
}

@Injectable()
export class GetAllUserNotesUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ userId }: GetAllUserNotesRequest) {
    const notes = await this.noteRepository.findAllByUserId(userId);

    return notes;
  }
}
