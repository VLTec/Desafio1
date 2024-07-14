import { UpdateNoteUseCase } from './updateNoteUseCase';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../entities/Note';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';

describe('Update Note', () => {
  let updateNoteUseCase: UpdateNoteUseCase;
  let noteRepositoryMock: jest.Mocked<NoteRepository>;

  beforeEach(() => {
    noteRepositoryMock = {
      findById: jest.fn(),
      update: jest.fn(), 
    } as unknown as jest.Mocked<NoteRepository>;

    updateNoteUseCase = new UpdateNoteUseCase(noteRepositoryMock);
  });

  it('should update an existing note', async () => {
    const noteId = '1';
    const originalNote = new Note({ 
      title: 'Test Note',
      description: 'Original Description',
      updatedAt: new Date(),
      createdAt: new Date(), 
      IdUser: '1', 
    });
    noteRepositoryMock.findById.mockResolvedValue(originalNote);

    const updatedTitle = 'Updated Title';
    const updatedDescription = 'Updated Description';

    const updatedNote = await updateNoteUseCase.execute({
      id: noteId,
      title: updatedTitle,
      description: updatedDescription,
    });

    expect(updatedNote.title).toBe(updatedTitle);
    expect(updatedNote.description).toBe(updatedDescription);
    expect(noteRepositoryMock.update).toHaveBeenCalledWith(updatedNote);
  });

  it('should throw NoteNotFoundException when trying to update a non-existing note', async () => {
    const invalidNoteId = '999';
    noteRepositoryMock.findById.mockResolvedValue(null);

    let error: Error | null = null;
    try {
      await updateNoteUseCase.execute({
        id: invalidNoteId,
        title: 'Updated Title',
        description: 'Updated Description',
      });
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(NoteNotFoundException);
  });
});
