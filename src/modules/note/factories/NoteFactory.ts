import { Note, NoteSchema } from "../entities/Note";

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override = {}) => {
  return new Note(
    {
        title: "Nota de Teste",
        description: "Descrição da Nota de Teste",
        userId: "ID de um Usuário",
      ...override,
    }, id
  );
};