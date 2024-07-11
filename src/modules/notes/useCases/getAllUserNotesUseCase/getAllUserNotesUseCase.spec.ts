import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { CreateNoteUseCase } from '../createNoteUseCase/createNoteUseCase';
import { GetAllUserNotesUseCase } from './getAllUserNotesUseCase';

let getAllUserNotesUseCase: GetAllUserNotesUseCase;
let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Get all Notes', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getAllUserNotesUseCase = new GetAllUserNotesUseCase(noteRepositoryInMemory);
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to get all user notes', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const noteSaved = await createNoteUseCase.execute({
      userId: '123',
      title: 'Nova nota',
      description: 'lorem ipsum',
    });

    expect(noteRepositoryInMemory.notes).toEqual([noteSaved]);

    const notes = await getAllUserNotesUseCase.execute({
      userId: '123',
    });

    expect(notes).toEqual([noteSaved]);
  });
});
