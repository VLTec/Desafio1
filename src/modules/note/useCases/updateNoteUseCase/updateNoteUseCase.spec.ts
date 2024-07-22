import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { makeNote } from '../../factories/NoteFactory';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { UpdateNoteUseCase } from './updateNoteUseCase';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';

let updateNoteUseCase: UpdateNoteUseCase;
let noteRepository: NoteRepositoryInMemory;

describe('update note', () => {
  beforeEach(() => {
    noteRepository = new NoteRepositoryInMemory();
    updateNoteUseCase = new UpdateNoteUseCase(noteRepository);
  });

  it('Should be able update note from user', async () => {
    const note = makeNote();
    noteRepository.notes.push(note);

    const title = 'Funções Quadráticas';
    const description = 'Forma geral:  a x 2 + b x + c = 0 ax  2  +bx+c=0';

    await updateNoteUseCase.execute({
      id: note.id,
      title,
      description,
      userId: note.userId,
    });

    expect(noteRepository.notes[0]).toMatchObject({
      title,
      description,
    });
  });

  it('Should not be able update note other user', async () => {
    const user1 = makeUser();
    const user2 = makeUser();
    const note = makeNote({ userId: user1.id });
    noteRepository.notes.push(note);

    const title = 'Funções Quadráticas';
    const description = 'Forma geral:  a x 2 + b x + c = 0 ax  2  +bx+c=0';

    expect(async () => {
      await updateNoteUseCase.execute({
        id: note.id,
        title,
        description,
        userId: user2.id,
      });
    }).rejects.toThrow(NoteNotFoundException);
  });

  it('Should throw an error when the note does not exist', async () => {
    const user = makeUser();
    const note = makeNote();

    expect(async () => {
      await updateNoteUseCase.execute({
        id: note.id,
        title: note.userId,
        description: note.description,
        userId: user.id,
      });
    }).rejects.toThrow(NoteNotFoundException);
  });
});
