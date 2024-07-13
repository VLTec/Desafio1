import { NoteRepository } from './NoteRepository';
import { Note } from '../entities/Note';

export class MockNoteRepository implements NoteRepository {
  private notes: Note[] = [];

  async create(note: Note): Promise<void> {
    this.notes.push(note);
  }

  async update(note: Note): Promise<void> {
    const index = this.notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      this.notes[index] = note;
    }
  }

  async findById(id: string): Promise<Note | null> {
    return this.notes.find((n) => n.id === id) || null;
  }

  async findAll(): Promise<Note[]> {
    return this.notes;
  }

  async delete(id: string): Promise<void> {
    this.notes = this.notes.filter((note) => note.id !== id);
  }
}
