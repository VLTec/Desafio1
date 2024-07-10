import { compare } from 'bcrypt';
import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { CreateNoteUseCase } from './createNoteUseCase';

let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Create Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to create a note', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const note = await createNoteUseCase.execute({
      userId: '123',
      title: 'Nova nota',
      description: 'lorem ipsum',
    });

    console.log(note);

    expect(noteRepositoryInMemory.notes).toEqual([note]);
  });
});
