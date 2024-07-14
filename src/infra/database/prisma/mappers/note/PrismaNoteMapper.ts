import { Note } from 'src/modules/note/entities/Note';
import { Note as NoteRaw } from '@prisma/client';

export class PrismaNoteMapper {
  static toPrisma({
    createdAt,
    title,
    description,
    IdUser,
    id,
    updatedAt,
  }: Note): NoteRaw {
    return {
      updatedAt,
      createdAt,
      IdUser,
      title,
      description,
      id,
    };
  }

  static toDomain({
    id,
    createdAt,
    title,
    description,
    IdUser,
    updatedAt,
  }: NoteRaw): Note {
    return new Note(
      {
        updatedAt,
        createdAt,
        title,
        IdUser,
        description,
      },
      id,
    );
  }
}
