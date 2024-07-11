import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';

interface DeleteNoteRequest {
  id: string;
}

@Injectable()
export class DeleteNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}
  async execute({ id }: DeleteNoteRequest ) {
    const note = await this.noteRepository.findById(id)
    
    if (!note) {
      throw new Error('note not found')
    }

    await this.noteRepository.delete(id);
  }
}
