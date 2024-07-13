import { NotFoundException } from '@nestjs/common';
import { GetNoteUseCase } from './getNoteUseCase';
import { MockNoteRepository } from '../../repositories/NoteRepositoryMock';
import { Note } from '../../entities/Note';

describe('GetNoteUseCase', () => {
  let getNoteUseCase: GetNoteUseCase;
  let noteRepository: MockNoteRepository;

  beforeEach(() => {
    noteRepository = new MockNoteRepository();
    getNoteUseCase = new GetNoteUseCase(noteRepository);
  });

  it('should get a note successfully', async () => {
    const mockNote = new Note({
      title: 'Test Note',
      content: 'This is a test note',
    });

    jest.spyOn(noteRepository, 'findById').mockResolvedValue(mockNote);

    const result = await getNoteUseCase.execute('1');

    expect(result).toEqual(mockNote);
  });

  it('should throw NotFoundException if note is not found', async () => {
    jest.spyOn(noteRepository, 'findById').mockResolvedValue(null);

    await expect(getNoteUseCase.execute('1')).rejects.toThrow(NotFoundException);
  });
});
