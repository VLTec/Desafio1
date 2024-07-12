import { UserRepositoryInMemory } from "src/modules/user/repositories/UserRepositoryInMemory";
import { NoteRepositoryInMemory } from "../../repositories/NoteRepositoryInMemory";

import { CreateNoteUseCase } from "./createNoteUseCase";

let createNoteUseCase: CreateNoteUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Create Note Use Case', () => {
  beforeEach(async () => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    meilerRepositoryInMemory = new MeilerRepositoryInMemory();
    createNoteUseCase = new CreateNoteUseCase(
      noteRepositoryInMemory,
      userRepositoryInMemory,
    );
  });

  it('Should be able to create a new note', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const note = await createNoteUseCase.execute({
      user_id: '126e3f54-cb14-4566-b71e-8da383fe032',
      title: 'Nota teste',
      description: 'Descrição nota de teste',
    });

    expect(noteRepositoryInMemory.notes).toEqual([note]);
  });
});