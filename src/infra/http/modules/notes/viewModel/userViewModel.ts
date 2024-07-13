import { Note } from 'src/modules/note/entities/Note';

export class NoteViewModel {
  static toHttp({ id, createdAt, description, title, userId  }: Note) {
    return {
      id,
      title,
      description,
      userId,
      createdAt,
    };
  }
}
