import { GetNotesUseCase } from './getAllNoteUseCase';
import { MockNoteRepository } from '../../repositories/NoteRepositoryMock'; 
import { Note } from '../../entities/Note';

describe('GetNotesUseCase', () => {
  let getNotesUseCase: GetNotesUseCase;
  let noteRepository: MockNoteRepository; 

  beforeEach(() => {
    noteRepository = new MockNoteRepository(); 
    getNotesUseCase = new GetNotesUseCase(noteRepository);
  });

  it('should return an array of notes', async () => {
    const mockNotes: Note[] = [
      new Note({ title: 'Note 1', content: 'Content of note 1' }),
      new Note({ title: 'Note 2', content: 'Content of note 2' }),
    ];

    const findAllSpy = jest.spyOn(noteRepository, 'findAll').mockResolvedValue(mockNotes);

    const result = await getNotesUseCase.execute();

    expect(result).toEqual(mockNotes);
    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });

});
