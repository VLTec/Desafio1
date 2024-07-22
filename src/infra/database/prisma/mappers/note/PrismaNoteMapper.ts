import { Note } from 'src/modules/note/entities/Note';
import { Note as NoteRaw } from '@prisma/client';

export class PrismaNoteMapper {
  static toPrisma({
    id,
    title,
    description,
    createdAt,
    userId,
  }: Note): NoteRaw {
    return {
      id,
      title,
      description,
      createdAt,
      userId,
    };
  }

  static toDomain({
    id,
    title,
    description,
    createdAt,
    userId,
  }: NoteRaw): Note {
    return new Note(
      {
        title,
        description,
        createdAt,
        userId,
      },
      id,
    );
  }
}
