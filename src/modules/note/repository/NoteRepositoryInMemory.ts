import { Note } from '../entities/Note';
import { NoteRepository } from './noteRepository';

export class NoteRepositoryInMemory implements NoteRepository {
  public notes: Note[] = [];

  async upsert(note: Note): Promise<Note | undefined> {
    const index = this.notes.findIndex((n) => n.id === note.id);

    if (index !== -1) {
      this.notes[index] = note;
    } else {
      this.notes.push(note);
    }

    return note;
  }

  async findById(id: string): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === id);

    if (!note) return null;

    return note;
  }

  async findAll(user_id: string): Promise<Note[]> {
    const notes = this.notes.filter((n) => n.user_id === user_id);

    return notes;
  }

  async delete(id: string): Promise<void> {
    this.notes = this.notes.filter((note) => note.id !== id);
  }
}
