import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { CreateNoteUseCase } from '../createNoteUseCase/createNoteUseCase';
import { GetNoteByIdUseCase } from './getNoteByIdUseCase';

let getNoteByIdUseCase: GetNoteByIdUseCase;
let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Get Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteByIdUseCase = new GetNoteByIdUseCase(noteRepositoryInMemory);
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to find a note by id', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const noteSaved = await createNoteUseCase.execute({
      userId: '123',
      title: 'Nova nota',
      description: 'lorem ipsum',
    });

    expect(noteRepositoryInMemory.notes).toEqual([noteSaved]);

    const note = await getNoteByIdUseCase.execute({
      userId: '123',
      noteId: noteSaved.id,
    });

    expect(note).toEqual(noteSaved);
  });
});
