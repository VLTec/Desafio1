import { makeNote } from '../../factories/NoteFactory';
import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { CreateNoteUseCase } from './createNoteUseCase';
import { makeUser } from 'src/modules/user/factories/userFactory';

let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('create note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to create note', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const note = await createNoteUseCase.execute({
      title: 'Revolução Francesa',
      description: 'Fim da monarquia absoluta, Surgimento da República',
      userId: 'bb72789b-2d13-480b-b71f-2a69af9cb1eb',
    });

    expect(noteRepositoryInMemory.notes).toEqual([note]);
  });

  it('Should be able create notes and relate to the user', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const user = makeUser();

    const note = await createNoteUseCase.execute({
      title: 'remember',
      description: null,
      userId: user.id,
    });

    expect(note).toMatchObject({ userId: user.id });
  });
});
