import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

describe('NoteService', () => {
  let service: NoteService;
  let prismaService: PrismaService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: PrismaService,
          useValue: {
            note: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            user: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
    prismaService = module.get<PrismaService>(PrismaService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a note and send an email', async () => {
      const createNoteDto: CreateNoteDto = {
        title: 'Test Note',
        description: 'Test Description',
        userId: '1',
      };
      const createdNote = {
        id: '1',
        title: 'Test Note',
        description: 'Test Description',
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const user = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '123456',
      };
      let date = new Date();
      jest.spyOn(prismaService.note, 'create').mockResolvedValue({
        ...createdNote,
      });
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({
        ...user,
      });
      jest.spyOn(mailerService, 'sendMail').mockResolvedValue(null);

      const result = await service.create(createNoteDto);

      expect(result).toEqual(createdNote);
      expect(prismaService.note.create).toHaveBeenCalledWith({
        data: {
          title: createNoteDto.title,
          description: createNoteDto.description,
          User: {
            connect: {
              id: createNoteDto.userId,
            },
          },
        },
      });
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: createNoteDto.userId },
      });
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: user.email,
        from: 'gugassilva2000@gmail.com',
        subject: 'Nota Criada!',
        text: 'Sua nota foi criada com sucesso!',
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of notes', async () => {
      const notes = [
        {
          id: '1',
          title: 'Test Note',
          description: 'Test Description',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '1',
        },
      ];
      jest.spyOn(prismaService.note, 'findMany').mockResolvedValue(notes);

      const result = await service.findAll();

      expect(result).toEqual(notes);
      expect(prismaService.note.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single note', async () => {
      const note = {
        id: '1',
        title: 'Test Note',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '1',
      };
      jest.spyOn(prismaService.note, 'findUnique').mockResolvedValue(note);

      const result = await service.findOne('1');

      expect(result).toEqual(note);
      expect(prismaService.note.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('update', () => {
    it('should update a note', async () => {
      const updateObj = {
        id: '1',
        title: 'Updated Note',
        description: 'Updated Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '1',
      };
      jest.spyOn(prismaService.note, 'update').mockResolvedValue({
        ...updateObj,
      });

      const result = await service.update('1', updateObj);

      expect(result).toEqual(updateObj);
      expect(prismaService.note.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateObj,
      });
    });
  });

  describe('remove', () => {
    it('should remove a note', async () => {
      const removedNote = {
        id: '1',
        title: 'Test Note',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '1',
      };

      jest.spyOn(prismaService.note, 'delete').mockResolvedValue(removedNote);

      const result = await service.remove('1');

      expect(result).toEqual(removedNote);
      expect(prismaService.note.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
