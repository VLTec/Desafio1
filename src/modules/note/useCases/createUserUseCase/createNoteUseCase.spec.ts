import { CreateNoteUseCase } from './createNoteUseCase';
import { MockNoteRepository } from '../../repositories/NoteRepositoryMock';
import { Note } from '../../entities/Note';

describe('CreateNoteUseCase', () => {
  let createNoteUseCase: CreateNoteUseCase;
  let noteRepository: MockNoteRepository; 

  beforeEach(() => {
    noteRepository = new MockNoteRepository(); 
    createNoteUseCase = new CreateNoteUseCase(noteRepository);
  });

  it('should create a note successfully', async () => {
    const mockCreateNoteRequest = {
      title: 'Test Note',
      content: 'This is a test note content',
    };

    const createSpy = jest.spyOn(noteRepository, 'create');

    const createdNote = await createNoteUseCase.execute(mockCreateNoteRequest);

    expect(createdNote).toBeInstanceOf(Note);
    expect(createdNote.title).toBe(mockCreateNoteRequest.title);
    expect(createdNote.content).toBe(mockCreateNoteRequest.content);
    expect(createSpy).toHaveBeenCalledWith(expect.any(Note));
  });

});
