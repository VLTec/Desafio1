import { Note } from '../entities/Note';

export abstract class NoteRepository {
  abstract create(note: Note): Promise<void>;
  abstract findAll(userId: string): Promise<Note[] | []>;
  abstract findById(id: string, userId: string): Promise<Note | null>;
  abstract update(note: Note): Promise<void>;
}
