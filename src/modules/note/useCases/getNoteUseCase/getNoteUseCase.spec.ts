import { NoteRepository } from '../../repositories/NoteRepository';
import { GetNoteUseCase } from './getNoteUseCase';
import { Note } from '../../entities/Note';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';

describe('Get Note', () => {
  let getNoteUseCase: GetNoteUseCase;
  let noteRepositoryMock: jest.Mocked<NoteRepository>;

  beforeEach(() => {
    noteRepositoryMock = {} as jest.Mocked<NoteRepository>;
    getNoteUseCase = new GetNoteUseCase(noteRepositoryMock);
  });

  it('should return existing notes', async () => {
    const mockNotes: Note[] = [
      new Note({ 
        title: 'Note 1', 
        description: 'Description 1',
        updatedAt: new Date(), 
        createdAt: new Date(), 
        IdUser: '1', 
      }),
      new Note({ 
        title: 'Note 2', 
        description: 'Description 2',
        updatedAt: new Date(),
        createdAt: new Date(), 
        IdUser: '2', 
      }),
    ];
    noteRepositoryMock.findAll = jest.fn().mockResolvedValue(mockNotes);

    const notes = await getNoteUseCase.execute();

    expect(notes).toEqual(mockNotes);
  });

  it('should throw NoteNotFoundException when no notes are found', async () => {
    noteRepositoryMock.findAll = jest.fn().mockResolvedValue([]);

    let error: Error | null = null;
    try {
      await getNoteUseCase.execute();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(NoteNotFoundException);
  });
});
