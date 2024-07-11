import { Note } from '../../../../../modules/notes/entities/Note';
import { Note as NoteRaw } from '@prisma/client';

export class PrismaNoteMapper {
  static toPrisma({
    id,
    userId,
    title,
    description,
    createdAt,
    updatedAt,
  }: Note): NoteRaw {
    return {
      id,
      userId,
      title,
      description,
      updatedAt,
      createdAt,
    };
  }

  static toDomain({
    id,
    userId,
    title,
    description,
    createdAt,
    updatedAt,
  }: NoteRaw): Note {
    return new Note(
      {
        title,
        userId,
        description,
        updatedAt,
        createdAt,
      },
      id,
    );
  }
}
