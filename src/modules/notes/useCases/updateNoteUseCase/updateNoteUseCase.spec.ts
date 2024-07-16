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
      user_id: '126e3f54-cb14-4566-b71e-8da383fe032',
      title: 'Nota teste',
      description: 'Descrição nota de teste',
    });

    expect(noteRepositoryInMemory.notes).toEqual([noteSaved]);

    await updateNoteUseCase.execute({
      userId: '126e3f54-cb14-4566-b71e-8da383fe032',
      id: noteSaved.id,
      title: 'Nova nota',
      description: 'Descrição nova nota',
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual('Nova nota');
    expect(noteRepositoryInMemory.notes[0].description).toEqual('Descrição nova nota');
  });
});