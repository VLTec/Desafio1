import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { CreateNoteUseCase } from '../createNoteUseCase/createNoteUseCase';
import { GetNoteByIdUseCase } from './getNoteByIdUseCase';

let getNoteByIdUseCase: GetNoteByIdUseCase;
let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Get Note Use Case', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteByIdUseCase = new GetNoteByIdUseCase(noteRepositoryInMemory);
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to find a note by id', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const noteSaved = await createNoteUseCase.execute({
      user_id: '126e3f54-cb14-4566-b71e-8da383fe032',
      title: 'Nota teste',
      description: 'Descrição nota de teste',
    });

    expect(noteRepositoryInMemory.notes).toEqual([noteSaved]);

    const note = await getNoteByIdUseCase.execute({
      id: noteSaved.id,
    });

    expect(note).toEqual(noteSaved);
  });
});