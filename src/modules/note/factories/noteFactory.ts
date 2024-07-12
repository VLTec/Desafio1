import { Note } from '../entities/Note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override = {}) => {
  return new Note(
    {
      title: 'Default Title',
      content: 'Default Content',
      ...override,
    },
    id,
  );
};
