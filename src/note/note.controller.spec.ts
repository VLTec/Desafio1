import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

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
            create: jest.fn().mockResolvedValue('new note'),
            findAll: jest.fn().mockResolvedValue(['note1', 'note2']),
            findOne: jest.fn().mockResolvedValue('note1'),
            update: jest.fn().mockResolvedValue('updated note'),
            remove: jest.fn().mockResolvedValue('removed note'),
          },
        },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a note', async () => {
      const createNoteDto: CreateNoteDto = {
        title: 'Test Note',
        description: 'Test description',
        userId: 'Test userId',
      };
      expect(await controller.create(createNoteDto)).toEqual('new note');
      expect(service.create).toHaveBeenCalledWith(createNoteDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of notes', async () => {
      expect(await controller.findAll()).toEqual(['note1', 'note2']);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single note', async () => {
      expect(await controller.findOne('1')).toEqual('note1');
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a note', async () => {
      const updateNoteDto: UpdateNoteDto = {
        id: 'Updated Id',
        title: 'Updated Note',
        description: 'Updated description',
        userId: 'Updated userId',
      };
      expect(await controller.update('1', updateNoteDto)).toEqual(
        'updated note',
      );
      expect(service.update).toHaveBeenCalledWith('1', updateNoteDto);
    });
  });

  describe('remove', () => {
    it('should remove a note', async () => {
      expect(await controller.remove('1')).toEqual('removed note');
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
