import { Note } from '../entities/Note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override = {}) => {
  return new Note(
    {
      IdUser: "1",
      title: 'nota inicial',
      description: '',
      ...override,
    },
    id,
  );
};
