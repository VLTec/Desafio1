import { Note } from '../entities/Note';
import { NoteRepository } from './NoteRepository';

export class NoteRepositoryInMemory implements NoteRepository {
  public notes: Note[] = [];

  async create(note: Note): Promise<void> {
    this.notes.push(note);
  }

  async update(updatedNote: Note): Promise<void> {
    this.notes = this.notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note,
    );
  }

  async findById(id: string): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === id);

    if (!note) {
      return null;
    }

    return note;
  }

  async findAll(): Promise<Note[] | null> {
    if (this.notes.length === 0) {
      return null;
    }

    return this.notes;
  }

  async delete(id: string): Promise<void> {
    this.notes = this.notes.filter((note) => note.id !== id);
  }
}
