import { DeleteNoteUseCase } from './deleteNoteUseCase';
import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { NoteException } from '../../exception/NoteException';
import { makeNote } from '../../factories/NoteFactory';

let deleteNoteUseCase: DeleteNoteUseCase;
let noteRepository: NoteRepositoryInMemory;

describe('Delete Note', () => {
  beforeEach(() => {
    noteRepository = new NoteRepositoryInMemory();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepository);
  });

  it('Delete a note', async () => {
    const note = makeNote({});

    noteRepository.notes = [note];

    await deleteNoteUseCase.execute({
      idNote: note.id,
    });

    expect(noteRepository.notes).toEqual([]);
  });

  it('Delete a non-existent note', () => {
    expect(
      async () => await deleteNoteUseCase.execute({
        idNote: 'Invalid ID',
      }),
    ).rejects.toThrowError(NoteException);
  });
});
