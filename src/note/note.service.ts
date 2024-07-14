import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NoteService {
  constructor(
    private prismaService: PrismaService,
    private readonly mailSender: MailerService,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const { title, description, userId } = createNoteDto;

    const createdNote = await this.prismaService.note.create({
      data: {
        title,
        description,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });

    let user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    this.mailSender.sendMail({
      to: user?.email,
      from: process.env.MAILER_FROM,
      subject: 'Nota Criada!',
      text: 'Sua nota foi criada com sucesso!',
    });

    return createdNote;
  }

  async findAll(): Promise<any> {
    const notes = await this.prismaService.note.findMany();
    return notes;
  }

  async findOne(id: string) {
    const notes = await this.prismaService.note.findUnique({
      where: { id },
    });
    return notes;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const notes = await this.prismaService.note.update({
      where: { id },
      data: updateNoteDto,
    });
    return notes;
  }

  async remove(id: string) {
    const notes = await this.prismaService.note.delete({
      where: { id },
    });
    return notes;
  }
}
