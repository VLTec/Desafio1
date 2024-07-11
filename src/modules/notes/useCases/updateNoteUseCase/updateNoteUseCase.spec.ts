import { UpdateNoteUseCase } from './updateNoteUseCase';
import { CreateNoteUseCase } from '../createNoteUseCase/createNoteUseCase';
import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';

let updateNoteUseCase: UpdateNoteUseCase;
let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Update Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    updateNoteUseCase = new UpdateNoteUseCase(noteRepositoryInMemory);
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to update a note', async () => {
    const noteSaved = await createNoteUseCase.execute({
      userId: '123',
      title: 'Nova nota 1',
      description: 'lorem ipsum',
    });

    expect(noteRepositoryInMemory.notes).toEqual([noteSaved]);

    await updateNoteUseCase.execute({
      userId: '123',
      noteId: noteSaved.id,
      title: 'Nova nota 2',
      description: 'lorem ipsum',
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual('Nova nota 2');
    expect(noteRepositoryInMemory.notes[0].description).toEqual('lorem ipsum');
  });
});
