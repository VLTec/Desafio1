import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';

interface UpdateNoteRequest {
  id: string;
  title: string;
  description: string;
}

@Injectable()
export class UpdateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}
  async execute({ id, title, description }: UpdateNoteRequest ) {

    const note = await this.noteRepository.findById(id)
    
    if (!note) {
      throw new Error('Note not found')
    }

    await this.noteRepository.update(note);
  }
}
