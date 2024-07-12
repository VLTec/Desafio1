import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';

interface UpdateNoteRequest {
  id: string;
  title: string;
  description: string;
  userId: string;
}

@Injectable()
export class UpdateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}
  async execute({ id, title, description, userId }: UpdateNoteRequest ) {
    const note = await this.noteRepository.findById(id)
    
    if (!note) {
      throw new Error('Note not found')
    }

    if (note.user_id != userId) {
      throw new Error('Unauthorized')
    }

    note.title = title
    note.description = description

    await this.noteRepository.update(note);
  }
}
