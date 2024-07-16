import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto } from './note.dto';
import { NotFoundException } from '@nestjs/common';
import { mockNotesService } from './notes.service.mock'; // Importe o mock do NotesService

describe('NotesController', () => {
  let controller: NotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: mockNotesService, // Use o mock do NotesService
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    jest.clearAllMocks(); // Limpe os mocks antes de cada teste
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpe os mocks depois de cada teste
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new note', () => {
      const createNoteDto: CreateNoteDto = {
        title: 'Test Note',
        description: 'This is a test note.',
        id: ''
      };
      const userEmail = 'test@example.com';

      const createdNote = {
        ...createNoteDto,
        id: '1',
        createdAt: expect.any(Date),
      };

      mockNotesService.create.mockReturnValue(createdNote);

      const result = controller.create(createNoteDto, { user: { email: userEmail } });
      expect(result).toEqual(createdNote);
      expect(mockNotesService.create).toHaveBeenCalledWith(createNoteDto, userEmail);
    });
  });

  describe('findAll', () => {
    it('should return all notes', () => {
      const notes = [{ id: '1', title: 'Test Note', content: 'This is a test note.', createdAt: new Date() }];
      mockNotesService.findAll.mockReturnValue(notes);

      const result = controller.findAll();
      expect(result).toEqual(notes);
      expect(mockNotesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a specific note', () => {
      const noteId = '1';
      const note = { id: noteId, title: 'Test Note', content: 'This is a test note.', createdAt: new Date() };
      mockNotesService.findOne.mockReturnValue(note);

      const result = controller.findOne(noteId);
      expect(result).toEqual(note);
      expect(mockNotesService.findOne).toHaveBeenCalledWith(noteId);
    });

    it('should throw NotFoundException if note is not found', () => {
      const noteId = '999';
      mockNotesService.findOne.mockReturnValue(undefined);

      expect(() => controller.findOne(noteId)).toThrowError(NotFoundException);
      expect(mockNotesService.findOne).toHaveBeenCalledWith(noteId);
    });
  });

  describe('update', () => {
    it('should update a specific note', () => {
      const noteId = '1';
      const updateNoteDto: UpdateNoteDto = { title: 'Updated Test Note' };
      const updatedNote = { id: noteId, ...updateNoteDto, createdAt: new Date() };
      mockNotesService.update.mockReturnValue(updatedNote);

      const result = controller.update(noteId, updateNoteDto);
      expect(result).toEqual(updatedNote);
      expect(mockNotesService.update).toHaveBeenCalledWith(noteId, updateNoteDto);
    });

    it('should throw NotFoundException if note is not found', () => {
      const noteId = '999';
      const updateNoteDto: UpdateNoteDto = { title: 'Updated Test Note' };
      mockNotesService.update.mockReturnValue(null);

      expect(() => controller.update(noteId, updateNoteDto)).toThrowError(NotFoundException);
      expect(mockNotesService.update).toHaveBeenCalledWith(noteId, updateNoteDto);
    });
  });

  describe('remove', () => {
    it('should remove a specific note', async () => {
      const noteId = '1';
      const deletedNote = { id: noteId, title: 'Test Note', content: 'This is a test note.', createdAt: new Date() };
      mockNotesService.remove.mockReturnValue(deletedNote);

      const result = await controller.remove(noteId);
      expect(result).toEqual(deletedNote);
      expect(mockNotesService.remove).toHaveBeenCalledWith(noteId);
    });

    it('should throw NotFoundException if note is not found', async () => {
      const noteId = '999';
      mockNotesService.remove.mockReturnValue(null);

      expect(async () => await controller.remove(noteId)).rejects.toThrowError(NotFoundException);
      expect(mockNotesService.remove).toHaveBeenCalledWith(noteId);
    });
  });
});
