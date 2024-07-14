import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from '../../modules/note/noteController';
import { NoteService } from '../../infra/mail/noteService';
import { CreateNoteDto } from '../note/dtos/createNote.dto';
import { UpdateNoteDto } from '../note/dtos/updateNote.dto';
import { Note } from '../note/entities/noteEntity';

describe('NoteController', () => {
  let controller: NoteController;
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        {
          provide: NoteService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
    service = module.get<NoteService>(NoteService);
  });

  it('should create a note', async () => {
    const note: Note = {
      id: 1,
      title: 'Test Note',
      description: 'Test Description',
      createdAt: new Date(),
      userId: 1,
    };
    const createNoteDto: CreateNoteDto = { title: 'Test Note', description: 'Test Description' };

    jest.spyOn(service, 'create').mockResolvedValue(note);

    expect(await controller.create(createNoteDto)).toBe(note);
  });

  it('should retrieve all notes', async () => {
    const notes: Note[] = [
      { id: 1, title: 'Test Note', description: 'Test Description', createdAt: new Date(), userId: 1 },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(notes);

    expect(await controller.findAll()).toBe(notes);
  });

  it('should retrieve a note by ID', async () => {
    const note: Note = {
      id: 1,
      title: 'Test Note',
      description: 'Test Description',
      createdAt: new Date(),
      userId: 1,
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(note);

    expect(await controller.findOne(1)).toBe(note);
  });

  it('should update a note', async () => {
    const note: Note = {
      id: 1,
      title: 'Updated Note',
      description: 'Updated Description',
      createdAt: new Date(),
      userId: 1,
    };
    const updateNoteDto: UpdateNoteDto = { title: 'Updated Note', description: 'Updated Description' };

    jest.spyOn(service, 'update').mockResolvedValue(note);

    expect(await controller.update(1, updateNoteDto)).toBe(note);
  });

  it('should delete a note', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);

    expect(await controller.delete(1)).toBeUndefined();
  });
});
