import { Note } from '../../../../../modules/note/entities/Note';
export class NoteViewModel {
  static toHttp({ createdAt, title, id, description }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
    };
  }
}
