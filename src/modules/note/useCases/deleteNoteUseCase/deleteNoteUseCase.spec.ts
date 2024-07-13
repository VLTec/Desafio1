import { DeleteNoteUseCase } from './deleteNoteUseCase';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/UserRepositoryInMemory';
import { User } from 'src/modules/user/entities/User';
import { NoteException } from '../../exception/NoteException';
import { makeNote } from '../../factories/NoteFactory';

let deleteNoteUseCase: DeleteNoteUseCase;
let noteRepository: NoteRepositoryInMemory;

describe('Delete Note', () => {
  beforeEach(() => {
    noteRepository = new NoteRepositoryInMemory();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepository);
  });

    it('Delete a note', async() => {
        const note = makeNote({});

        noteRepository.notes = [note];

        await deleteNoteUseCase.execute({ 
            idNote: note.id
        });

        expect(noteRepository.notes).toEqual([])
    })


    it('Delete a non-existent note', async() => {
        expect(await deleteNoteUseCase.execute({ 
            idNote: "Invalid ID"
        })).rejects.toThrow(NoteException);
    })

});
