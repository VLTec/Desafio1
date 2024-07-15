import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { makeNote } from '../../factories/NoteFactory';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';
import { FindByIdNoteUseCase } from './findByIdNoteUseCase';

let findByIdUseCase: FindByIdNoteUseCase;
let noteRepository: NoteRepositoryInMemory;

describe('find by id note', () => {
  beforeEach(() => {
    noteRepository = new NoteRepositoryInMemory();
    findByIdUseCase = new FindByIdNoteUseCase(noteRepository);
  });

  it('Should be able return a note from user', async () => {
    const user = makeUser();
    const note1 = makeNote({ userId: user.id });
    const note2 = makeNote();

    noteRepository.notes.push(note1);
    noteRepository.notes.push(note2);

    const note = await findByIdUseCase.execute(note1.id, user.id);
    expect(note).toEqual(note1);
  });

  it('Should not be able return a note from other user', async () => {
    const user1 = makeUser();
    const user2 = makeUser();
    const note = makeNote({ userId: user1.id });

    noteRepository.notes.push(note);

    expect(async () => {
      await findByIdUseCase.execute(note.id, user2.id);
    }).rejects.toThrow(NoteNotFoundException);
  });
});
