import { Note } from '../../../../../modules/note/entities/noteEntity';
import { CreateNoteDto } from '../../../../../modules/note/dtos/createNote.dto';
import { UpdateNoteDto } from '../../../../../modules/note/dtos/updateNote.dto';

export interface NoteRepository {
  create(data: CreateNoteDto): Promise<Note>;
  findAll(): Promise<Note[]>;
  findOne(id: string): Promise<Note | null>;
  update(id: string, data: UpdateNoteDto): Promise<Note>;
  delete(id: string): Promise<void>;
}
