import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { makeNote } from '../../factories/NoteFactory';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { FindAllNotesUseCase } from './findAllNotesUseCase';

let findAllNotesUseCase: FindAllNotesUseCase;
let noteRepository: NoteRepositoryInMemory;

describe('find all notes', () => {
  beforeEach(() => {
    noteRepository = new NoteRepositoryInMemory();
    findAllNotesUseCase = new FindAllNotesUseCase(noteRepository);
  });

  it('Should be able return all notes from user', async () => {
    const user = makeUser();
    const note1 = makeNote({ userId: user.id });
    const note2 = makeNote();

    noteRepository.notes.push(note1);
    noteRepository.notes.push(note2);

    const notes = await findAllNotesUseCase.execute({ userId: user.id });
    expect(notes).toHaveLength(1);
  });
});
