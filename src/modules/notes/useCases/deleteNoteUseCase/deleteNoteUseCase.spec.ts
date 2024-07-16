import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { CreateNoteUseCase } from '../createNoteUseCase/createNoteUseCase';
import { DeleteNoteUseCase } from './deleteNoteUseCase';

let deleteNoteUseCase: DeleteNoteUseCase;
let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Delete Note Use Case', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory);
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to delete a note by Id', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const noteSaved = await createNoteUseCase.execute({
      user_id: '126e3f54-cb14-4566-b71e-8da383fe032',
      title: 'Nota teste',
      description: 'Descrição nota de teste',
    });

    expect(noteRepositoryInMemory.notes).toEqual([noteSaved]);

    await deleteNoteUseCase.execute({
      id: noteSaved.id,
    });

    expect(noteRepositoryInMemory.notes).toEqual([]);
  });
});