import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../entities/Note';

interface UpdateNoteRequest {
  id: string;
  title?: string;
  content?: string;
}

@Injectable()
export class UpdateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ id, title, content }: UpdateNoteRequest): Promise<Note> {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }

    if (title !== undefined) {
      note.title = title;
    }
    if (content !== undefined) {
      note.content = content;
    }

    try {
      await this.noteRepository.update(note);
      return note;
    } catch (error) {
      throw new Error(`Failed to update note with id ${id}: ${error.message}`);
    }
  }
}
