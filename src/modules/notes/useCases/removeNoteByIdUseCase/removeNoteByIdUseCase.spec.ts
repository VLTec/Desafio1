import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { CreateNoteUseCase } from '../createNoteUseCase/createNoteUseCase';
import { RemoveNoteByIdUseCase } from './removeNoteByIdUseCase';

let removeNoteByIdUseCase: RemoveNoteByIdUseCase;
let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Delete Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    removeNoteByIdUseCase = new RemoveNoteByIdUseCase(noteRepositoryInMemory);
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to delete a note', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const noteSaved = await createNoteUseCase.execute({
      userId: '123',
      title: 'Nova nota',
      description: 'lorem ipsum',
    });

    expect(noteRepositoryInMemory.notes).toEqual([noteSaved]);

    await removeNoteByIdUseCase.execute({
      userId: '123',
      noteId: noteSaved.id,
    });

    expect(noteRepositoryInMemory.notes).toEqual([]);
  });
});
