import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { CreateNoteUseCase } from '../createNoteUseCase/createNoteUseCase';
import { GetAllNoteUseCase } from './getAllNoteUseCase';

let getAllNoteUseCase: GetAllNoteUseCase;
let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Get all Notes Use Cases', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getAllNoteUseCase = new GetAllNoteUseCase(noteRepositoryInMemory);
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to get all user notes by UserId', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const noteSaved = await createNoteUseCase.execute({
      user_id: '126e3f54-cb14-4566-b71e-8da383fe032',
      title: 'Nota teste',
      description: 'Descrição nota de teste',
    });

    expect(noteRepositoryInMemory.notes).toEqual([noteSaved]);

    const notes = await getAllNoteUseCase.execute({
        user_id: '126e3f54-cb14-4566-b71e-8da383fe032',
    });

    expect(notes).toEqual([noteSaved]);
  });
});