import { Injectable } from '@nestjs/common';
import { Note } from '../../entities/Note';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';
import { NoteRepository } from '../../repositories/NoteRepository';

interface UpdateNoteRequest {
  id: string;
  title: string;
  description: string | null;
  userId: string;
}

@Injectable()
export class UpdateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ id, title, description, userId }: UpdateNoteRequest) {
    const note = await this.noteRepository.findById(id, userId);

    if (!note) throw new NoteNotFoundException();
    if (userId != note.userId) throw new NoteNotFoundException();

    const updateNote = new Note(
      {
        title,
        description: description || note.description,
        userId: note.userId,
        createdAt: note.createdAt,
      },
      note.id,
    );
    await this.noteRepository.update(updateNote);
  }
}
