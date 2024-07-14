import { Note } from '../entities/Note';
import { NoteRepository } from './NoteRepository';

export class NoteRepositoryInMemory implements NoteRepository {
  notes: Note[] = [];

  async create(note: Note): Promise<void> {
    this.notes.push(note);
  }

  async findById(id: string): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === id);
    return note || null;
  }

  async findAll(): Promise<Note[]> {
    return this.notes;
  }

  async update(note: Note): Promise<void> {
    const index = this.notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      this.notes[index] = note;
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }
}