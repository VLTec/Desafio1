import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { DeleteNoteUseCase } from './deleteNoteUseCase';
import { makeNote } from '../../factories/NoteFactory';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';

let deleteNoteUseCase: DeleteNoteUseCase;
let noteRepository: NoteRepositoryInMemory;

describe('delete note', () => {
  beforeEach(() => {
    noteRepository = new NoteRepositoryInMemory();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepository);
  });

  it('Should be able delete note from user', async () => {
    const user = makeUser();
    const note = makeNote({
      userId: user.id,
    });
    noteRepository.notes.push(note);

    await deleteNoteUseCase.execute(note.id, user.id);
    expect(noteRepository.notes).toHaveLength(0);
  });

  it('Should not be able to delete note from others users', async () => {
    const user1 = makeUser();
    const user2 = makeUser();
    const note = makeNote({
      userId: user1.id,
    });
    noteRepository.notes.push(note);

    expect(async () => {
      await deleteNoteUseCase.execute(note.id, user2.id);
    }).rejects.toThrow(NoteNotFoundException);
  });

  it('Should throw an error when the note does not exist', async () => {
    const user = makeUser();
    const note = makeNote();

    expect(async () => {
      await deleteNoteUseCase.execute(note.id, user.id);
    }).rejects.toThrow(NoteNotFoundException);
  });
});
