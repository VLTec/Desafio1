import { UpdateNoteUseCase } from './updateNoteUseCase';
import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { NoteException } from '../../exception/NoteException';
import { makeNote } from '../../factories/NoteFactory';

let updateNoteUseCase: UpdateNoteUseCase;
let noteRepository: NoteRepositoryInMemory;

describe('Update Note', () => {
  beforeEach(() => {
    noteRepository = new NoteRepositoryInMemory();
    updateNoteUseCase = new UpdateNoteUseCase(noteRepository);
  });

  it('Update a Note', async () => {
    expect(noteRepository.notes).toEqual([]);

    const note = makeNote({
      id: 'Teste',
    });

    noteRepository.notes = [note];

    const noteUpdated = makeNote({
      id: note.id,
      createdAt: note.createdAt,
      userId: note.userId,
      title: 'Teste 2',
      description: 'Teste 3',
    });

    expect(await updateNoteUseCase.execute(noteUpdated)).toEqual(
      noteUpdated,
    );
  });

  it('Update a note that doesnt exist', async () => {
    const note = makeNote({
      id: 'Teste',
    });

    expect(
      async () => await updateNoteUseCase.execute(note),
    ).rejects.toThrowError(NoteException);
  });

  it('Update a note that does not have a valid title', async () => {
    const note = makeNote({
      id: 'Teste',
      title: '',
    });

    noteRepository.notes = [note];

    expect(
      async () => await updateNoteUseCase.execute(note),
    ).rejects.toThrowError(NoteException);
  });
});
