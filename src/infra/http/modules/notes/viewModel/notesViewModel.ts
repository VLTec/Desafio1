import { Note } from 'src/modules/notes/entities/Note';

export class NoteViewModel {
  static toHttp({ id, title, description, createdAt, updatedAt }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
      updatedAt,
    };
  }
}
