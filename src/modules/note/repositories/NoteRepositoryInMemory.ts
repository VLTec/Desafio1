import { Note } from '../entities/Note';
import { NoteRepository } from './NoteRepository';

export class NoteRepositoryInMemory implements NoteRepository {
  public notes: Note[] = [];

  async create(note: Note): Promise<void> {
    this.notes.push(note);
  }

  async findById(id: string, userId: string): Promise<Note | null> {
    const note = this.notes.find(
      (note) => note.id === id && note.userId == userId,
    );

    if (!note) return null;
    return note;
  }

  async findAll(userId: string): Promise<Note[] | []> {
    return this.notes.filter((note) => note.userId == userId);
  }

  async delete(id: string): Promise<void> {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  async update(note: Note): Promise<void> {
    this.notes = this.notes.map((u) => (u.id === note.id ? note : u));
  }
}
