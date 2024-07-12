import { Note } from '../../../../../modules/note/entities/Note'; 

export class NoteViewModel {
  static toHttp({ id, title, content, createdAt }: Note) {
    return {
      id: id.toString(), 
      title,
      content,
      createdAt,
    };
  }
}
