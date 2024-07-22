import { Note } from '../entities/Note';

type Override = Partial<Note>;

export const makeNote = ({ ...override }: Override = {}) => {
  return new Note({
    title: 'Revolução Francesa (1789)',
    description: 'Fim da monarquia absoluta, Surgimento da República',
    userId: 'bb72789b-2d13-480b-b71f-2a69af9cb1eb',
    ...override,
  });
};
