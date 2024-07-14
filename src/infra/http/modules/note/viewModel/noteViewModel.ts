import { Note } from '@prisma/client';

export class NoteViewModel {
  static toHttp({ id, title, description, createdAt, userId }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
      userId,
    };
  }
}
