import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { BadRequestException } from '@nestjs/common';

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
        from: '"nest-modules" <modules@nestjs.com>',
        subject: 'Nota Criada!',
        text: 'Sua nota foi criada com sucesso!',
      });
    });
  });

  describe('update', () => {
    it('should update a note', async () => {
      const updateNoteDto: UpdateNoteDto = {
        title: 'Updated Note',
        description: 'Updated Description',
      };
      const note = {
        id: '1',
        title: 'Test Note',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '1',
      };
      const updatedNote = {
        ...note,
        ...updateNoteDto,
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.note, 'findUnique').mockResolvedValue(note);
      jest.spyOn(prismaService.note, 'update').mockResolvedValue(updatedNote);

      const result = await service.update('1', updateNoteDto);

      expect(result).toEqual(updatedNote);
      expect(prismaService.note.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(prismaService.note.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateNoteDto,
      });
    });

    it('should throw BadRequestException if note not found', async () => {
      const updateNoteDto: UpdateNoteDto = {
        title: 'Updated Note',
        description: 'Updated Description',
      };

      jest.spyOn(prismaService.note, 'findUnique').mockResolvedValue(null);

      await expect(service.update('1', updateNoteDto)).rejects.toThrow(
        new BadRequestException('Note not found!'),
      );
    });
  });

  describe('remove', () => {
    it('should remove a note', async () => {
      const note = {
        id: '1',
        title: 'Test Note',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '1',
      };

      jest.spyOn(prismaService.note, 'findUnique').mockResolvedValue(note);
      jest.spyOn(prismaService.note, 'delete').mockResolvedValue(note);

      const result = await service.remove('1');

      expect(result).toEqual(note);
      expect(prismaService.note.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(prismaService.note.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw BadRequestException if note not found', async () => {
      jest.spyOn(prismaService.note, 'findUnique').mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(
        new BadRequestException('Note not found!'),
      );
    });
  });
});
