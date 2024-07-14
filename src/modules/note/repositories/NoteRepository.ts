import { Note } from '../entities/Note';

export abstract class NoteRepository {
  abstract create(note: Note): Promise<void>;
}
