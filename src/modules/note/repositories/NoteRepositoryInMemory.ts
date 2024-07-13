import { Note } from '../entities/Note';
import { INoteRepository } from './NoteRepository';

export class NoteRepositoryInMemory implements INoteRepository {
 
  public notes: Note[] = [];

  public async create(note: Note): Promise<void> {
    this.notes.push(note);
  }

  public async update(updatedNote: Note): Promise<void> {
    this.notes = this.notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note,
    );
  }

  public async findById(id: string): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === id);

    if (!note) {
      return null;
    }

    return note;
  }

  public async getNotesByUser(userId: string): Promise<Note[]> {
     const notes = this.notes.filter(note => note.userId === userId)

     return notes
  }

  public async findAll(): Promise<Note[]> {
    return this.notes;
  }

  public async delete(id: string): Promise<void> {
    this.notes = this.notes.filter((note) => note.id !== id);
  }
}
