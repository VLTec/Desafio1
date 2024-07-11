import { Note } from '../entities/Note';

export abstract class NoteRepository {
  abstract create(note: Note): Promise<void>;
  abstract findAll(userId: string): Promise<void>;
  abstract findById(id: string): Promise<Note | null>;
  abstract update(note: Note ): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
