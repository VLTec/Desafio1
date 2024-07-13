import { format } from 'date-fns';
import { Note } from '../../../../../modules/note/entities/Note';

export class NoteViewModel {
  static toHttp({ id, title, content, createdAt }: Note) {
    const formattedDate = format(createdAt, 'dd/MM/yyyy');

    return {
      id: id.toString(),
      title,
      content,
      createdAt: formattedDate,
    };
  }
}
