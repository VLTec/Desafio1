import { GetAllNotesUseCase } from './getAllNotesUseCase';
import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { makeNote } from '../../factories/NoteFactory';

let getAllNotesUseCase: GetAllNotesUseCase;
let noteRepository: NoteRepositoryInMemory;

describe('Get Alll Notes', () => {
  beforeEach(() => {
    noteRepository = new NoteRepositoryInMemory();
    getAllNotesUseCase = new GetAllNotesUseCase(noteRepository);
  });

    it('Get all notes from the database', async() => {
        expect(noteRepository.notes).toEqual([])

        const note = makeNote({});

        noteRepository.notes = [note];

        expect(await getAllNotesUseCase.execute()).toEqual([note])
    })


});
