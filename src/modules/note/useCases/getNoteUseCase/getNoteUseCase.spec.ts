import { GetNoteUseCase } from './getNoteUseCase';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/UserRepositoryInMemory';
import { User } from 'src/modules/user/entities/User';
import { NoteException } from '../../exception/NoteException';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { makeNote } from '../../factories/NoteFactory';

let getNoteUseCase: GetNoteUseCase;
let noteRepository: NoteRepositoryInMemory;

describe('Get Note', () => {
  beforeEach(() => {
      noteRepository = new NoteRepositoryInMemory();
      getNoteUseCase = new GetNoteUseCase(noteRepository)
  });

  it('Get a note by id', async () => {
    expect(noteRepository.notes).toEqual([])

    const note = makeNote({
        id: "Teste" 
    });

    noteRepository.notes = [note];

    expect(await getNoteUseCase.execute({ idNote: "Teste" })).toEqual(note)
  });

  it('Get a new one that doesnt exist', async () => {
    expect(await getNoteUseCase.execute({ idNote: "Teste" })).rejects.toThrow(NoteException)   
  });

});
