import { Note, NoteSchema } from "../entities/Note";

export interface INoteRepository {
    create(note: Note): Promise<void>;
    update(note: Note): Promise<void>;
    findById(id: string): Promise<Note | null>;
    findAll(): Promise<Note[]>;
    getNotesByUser(userId: string): Promise<Note[]>
    delete(id: string): Promise<void>;
}
  