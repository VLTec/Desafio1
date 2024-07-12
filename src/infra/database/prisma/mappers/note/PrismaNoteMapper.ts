import { Note } from 'src/modules/note/entities/Note';
import { Note as NoteRaw } from '@prisma/client';

export class PrismaNoteMapper {
  static toPrisma({
    createdAt,
    title,
    content,
    id,
    updatedAt,
  }: Note): NoteRaw {
    return {
      id,
      createdAt,
      title,
      content,
      updatedAt,
    };
  }

  static toDomain({
    id,
    createdAt,
    title,
    content,
    updatedAt,
  }: NoteRaw): Note {
    return new Note(
      {
        createdAt,
        title,
        content,
        updatedAt,
      },
      id,
    );
  }
}
