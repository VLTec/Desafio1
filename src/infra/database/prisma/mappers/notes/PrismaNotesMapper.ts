import { Note } from 'src/modules/notes/entities/Note';

import { Note as NoteRaw } from '@prisma/client';

export class PrismaNotesMapper {
  static toPrisma({
    id,
    title,
    description,
    createdAt,
    updatedAt,
    user_id,
  }: Note): NoteRaw {
    return {
      id,
      title,
      description,
      createdAt,
      updatedAt,
      user_id
    };
  }

  static toDomain({
    id,
    title,
    description,
    createdAt,
    updatedAt,
    user_id,
  }: NoteRaw): Note {
    return new Note(
      {
        title,
        description,
        updatedAt,
        createdAt,
        user_id,
      },
      id,
    );
  }
}
