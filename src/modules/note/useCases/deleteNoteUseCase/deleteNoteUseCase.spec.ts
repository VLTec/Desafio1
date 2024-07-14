import { DeleteNoteUseCase } from './deleteNoteUseCase';
import { NoteRepository } from '../../repositories/NoteRepository';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound';

describe('Delete Note', () => {
  let deleteNoteUseCase: DeleteNoteUseCase;
  let noteRepositoryMock: jest.Mocked<NoteRepository>;

  beforeEach(() => {
    noteRepositoryMock = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<NoteRepository>;

    deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryMock);
  });

  it('should delete an existing note', async () => {
    const noteId = '1';
    noteRepositoryMock.findById.mockResolvedValue({ id: noteId, title: 'Test Note' } as any);

    await deleteNoteUseCase.execute({ id: noteId });

    expect(noteRepositoryMock.delete).toHaveBeenCalledWith(noteId);
  });

  it('should throw NoteNotFoundException when trying to delete a non-existing note', async () => {
    const invalidNoteId = '999';
    noteRepositoryMock.findById.mockResolvedValue(null);

    let error: Error | null = null;
    try {
      await deleteNoteUseCase.execute({ id: invalidNoteId });
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(NoteNotFoundException);
    expect(error!.message).toBe('Nota não encontrada');
  });
});
