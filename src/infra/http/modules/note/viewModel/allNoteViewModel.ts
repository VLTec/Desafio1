import { Note } from 'src/modules/note/entities/Note';

export class AllNoteViewModel {
  static toHttp(note: Note) {
    return {
      id: note._id,
      title: note.title,
      description: note.description,
      IdUser: note.IdUser,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }

  static toHttpList(notes: Note[]) {
    return notes.map(note => this.toHttp(note));
  }
}
