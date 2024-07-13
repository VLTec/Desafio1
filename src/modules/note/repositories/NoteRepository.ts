import { Note, NoteSchema } from "../entities/Note";

export interface NoteRepository {
    create(note: Note): Promise<void>;
    update(note: Note): Promise<void>;
    findById(id: string): Promise<Note | null>;
    findAll(): Promise<Note[] | null>;
    delete(id: string): Promise<void>;
}
  