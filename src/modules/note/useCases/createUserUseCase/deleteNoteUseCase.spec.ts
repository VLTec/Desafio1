import { NotFoundException } from '@nestjs/common';
import { DeleteNoteUseCase } from './deleteNoteUseCase';
import { MockNoteRepository } from '../../repositories/NoteRepositoryMock';
import { Note } from '../../entities/Note';

describe('DeleteNoteUseCase', () => {
  let deleteNoteUseCase: DeleteNoteUseCase;
  let noteRepository: MockNoteRepository;

  beforeEach(() => {
    noteRepository = new MockNoteRepository();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepository);
  });

  it('should delete a note successfully', async () => {
    const mockNote = new Note({
      title: 'Test Note',
      content: 'This is a test note',
    });

    jest.spyOn(noteRepository, 'findById').mockResolvedValue(mockNote);
    const deleteSpy = jest.spyOn(noteRepository, 'delete').mockResolvedValue();

    await deleteNoteUseCase.execute('1');

    expect(deleteSpy).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if note is not found', async () => {
    jest.spyOn(noteRepository, 'findById').mockResolvedValue(null);

    await expect(deleteNoteUseCase.execute('1')).rejects.toThrow(NotFoundException);
  });
});
