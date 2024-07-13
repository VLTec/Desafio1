import { NotFoundException } from '@nestjs/common';
import { UpdateNoteUseCase } from './updateNoteUseCase';
import { MockNoteRepository } from '../../repositories/NoteRepositoryMock';
import { Note } from '../../entities/Note';

describe('UpdateNoteUseCase', () => {
  let updateNoteUseCase: UpdateNoteUseCase;
  let noteRepository: MockNoteRepository;

  beforeEach(() => {
    noteRepository = new MockNoteRepository();
    updateNoteUseCase = new UpdateNoteUseCase(noteRepository);
  });

  it('should update a note successfully', async () => {
    const existingNote = new Note({
      title: 'Old Title',
      content: 'Old Content',
    });

    const updatedNoteData = {
      id: '1',
      title: 'Updated Title',
      content: 'Updated Content',
    };

    jest.spyOn(noteRepository, 'findById').mockResolvedValue(existingNote);
    const updateSpy = jest.spyOn(noteRepository, 'update').mockResolvedValue();

    const updatedNote = await updateNoteUseCase.execute(updatedNoteData);

  expect(updatedNote.title).toEqual(updatedNoteData.title); 
  expect(updatedNote.content).toEqual(updatedNoteData.content); 
  expect(updateSpy).toHaveBeenCalledWith(existingNote);
  });

  it('should throw NotFoundException if note is not found', async () => {
    const updatedNoteData = {
      id: '1',
      title: 'Updated Title',
      content: 'Updated Content',
    };

    jest.spyOn(noteRepository, 'findById').mockResolvedValue(null);

    await expect(updateNoteUseCase.execute(updatedNoteData)).rejects.toThrow(NotFoundException);
  });
});
