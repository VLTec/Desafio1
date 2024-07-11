import { Note } from '../../../../../modules/notes/entities/Note';

export class NoteViewModel {
  static toHttp({ title, id, description, createdAt }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
    };
  }
}
