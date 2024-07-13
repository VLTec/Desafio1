import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/createNoteUseCase';
import { GetNotesUseCase } from 'src/modules/note/useCases/createUserUseCase/getAllNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/getNoteUseCase';
import { UpdateNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/updateNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/deleteNoteUseCase';
import { NotFoundException } from '@nestjs/common';
import { NoteViewModel } from './viewModel/noteViewModel';
import { CreateNoteDto, UpdateNoteDto } from './dtos/note.dto';
import { Note } from 'src/modules/note/entities/Note';

describe('NoteController', () => {
  let controller: NoteController;
  let createNoteUseCase: CreateNoteUseCase;
  let getNotesUseCase: GetNotesUseCase;
  let getNoteUseCase: GetNoteUseCase;
  let updateNoteUseCase: UpdateNoteUseCase;
  let deleteNoteUseCase: DeleteNoteUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        {
          provide: CreateNoteUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetNotesUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetNoteUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateNoteUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteNoteUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
    createNoteUseCase = module.get<CreateNoteUseCase>(CreateNoteUseCase);
    getNotesUseCase = module.get<GetNotesUseCase>(GetNotesUseCase);
    getNoteUseCase = module.get<GetNoteUseCase>(GetNoteUseCase);
    updateNoteUseCase = module.get<UpdateNoteUseCase>(UpdateNoteUseCase);
    deleteNoteUseCase = module.get<DeleteNoteUseCase>(DeleteNoteUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createNote', () => {
    it('should create a new note', async () => {
      const createNoteDto: CreateNoteDto = {
        title: 'Test Note',
        content: 'This is a test note',
      };

      const createdNote = new Note({
        title: createNoteDto.title,
        content: createNoteDto.content,
      }, '1');

      jest.spyOn(createNoteUseCase, 'execute').mockResolvedValue(createdNote);

      const result = await controller.createNote(createNoteDto);

      expect(createNoteUseCase.execute).toHaveBeenCalledWith(createNoteDto);
      expect(result).toEqual(NoteViewModel.toHttp(createdNote));
    });
  });

  describe('getAllNotes', () => {
    it('should return an array of notes', async () => {
      const mockNotes = [
        new Note({
          title: 'Note 1',
          content: 'Content of note 1',
        }),
        new Note({
          title: 'Note 2',
          content: 'Content of note 2',
        }),
      ];
      jest.spyOn(getNotesUseCase, 'execute').mockResolvedValue(mockNotes);

      const result = await controller.getAllNotes();

      expect(getNotesUseCase.execute).toHaveBeenCalled();
      expect(result).toEqual(mockNotes.map(note => NoteViewModel.toHttp(note)));
    });
  });

  describe('getNoteById', () => {
    it('should return a single note by ID', async () => {
      const noteId = '1';
      const note = new Note({
        title: 'Test Note',
        content: 'This is a test note',
      });
      jest.spyOn(getNoteUseCase, 'execute').mockResolvedValue(note);

      const result = await controller.getNoteById(noteId);

      expect(getNoteUseCase.execute).toHaveBeenCalledWith(noteId);
      expect(result).toEqual(NoteViewModel.toHttp(note));
    });

    it('should throw NotFoundException if note is not found', async () => {
      const noteId = '999';
      jest.spyOn(getNoteUseCase, 'execute').mockRejectedValue(new NotFoundException());

      await expect(controller.getNoteById(noteId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateNote', () => {
    it('should update a note successfully', async () => {
      const noteId = '1';
      const updateNoteDto = {
        title: 'Updated Title',
        content: 'Updated Content',
      };
      const updatedNote = new Note({
        title: updateNoteDto.title,
        content: updateNoteDto.content,
      });
      jest.spyOn(updateNoteUseCase, 'execute').mockResolvedValue(updatedNote);
  
      const result = await controller.updateNote(noteId, updateNoteDto);
  
      expect(updateNoteUseCase.execute).toHaveBeenCalledWith({ id: noteId, ...updateNoteDto });
      expect(result).toEqual(NoteViewModel.toHttp(updatedNote));
    });
  
  });

  describe('deleteNote', () => {
    it('should delete a note successfully', async () => {
      const noteId = '1';
      jest.spyOn(deleteNoteUseCase, 'execute').mockResolvedValue();

      const result = await controller.deleteNote(noteId);

      expect(deleteNoteUseCase.execute).toHaveBeenCalledWith(noteId);
      expect(result).toEqual({ message: 'registro deletado com sucesso' });
    });
  });
});
