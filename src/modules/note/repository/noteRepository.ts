import { Note } from '../entities/Note';

export abstract class NoteRepository {
  abstract upsert(note): Promise<void>;
  abstract findById(id: string): Promise<Note | null>;
  abstract findAll(user_id: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
