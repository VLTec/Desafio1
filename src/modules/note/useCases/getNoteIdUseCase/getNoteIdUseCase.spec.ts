import { GetNoteIdUseCase } from './getNoteIdUseCase';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../entities/Note';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';

describe('Get Note by ID', () => {
  let getNoteIdUseCase: GetNoteIdUseCase;
  let noteRepositoryMock: jest.Mocked<NoteRepository>;

  beforeEach(() => {
    noteRepositoryMock = {} as jest.Mocked<NoteRepository>;
    getNoteIdUseCase = new GetNoteIdUseCase(noteRepositoryMock);
  });

  it('should return a note when a valid ID is provided', async () => {
    const noteId = '1';
    const mockNote = new Note({ 
      title: 'Test Note',
      description: 'Test Description',
      updatedAt: new Date(), 
      createdAt: new Date(), 
      IdUser: '1', 
    });
    noteRepositoryMock.findById = jest.fn().mockResolvedValue(mockNote);

    const note = await getNoteIdUseCase.execute({ id: noteId });

    expect(note).toEqual(mockNote);
  });

  it('should throw NoteNotFoundException when an invalid ID is provided', async () => {
    const invalidNoteId = '999';
    noteRepositoryMock.findById = jest.fn().mockResolvedValue(null);

    let error: Error | null = null;
    try {
      await getNoteIdUseCase.execute({ id: invalidNoteId });
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(NoteNotFoundException);
  });
});
