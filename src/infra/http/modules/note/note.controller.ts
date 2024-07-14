import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CreateNoteUseCase } from '../../../../modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { CreateNoteBody } from './dtos/createNoteBody';
import { NoteViewModel } from './viewModel/noteViewModel';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { UpdateNoteUseCase } from 'src/modules/note/useCases/updateNoteUseCase/updateNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { GetNoteIdUseCase } from 'src/modules/note/useCases/getNoteIdUseCase/getNoteIdUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { AllNoteViewModel } from './viewModel/allNoteViewModel';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';

@ApiTags('note')
@Controller('note')
export class NoteController {
  constructor(
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly getNoteUseCase: GetNoteUseCase,
    private readonly getNoteIdUseCase: GetNoteIdUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase,
    private readonly mailerService: MailerService,
    private readonly userRepository: UserRepository
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNote(
    @Request() req: AuthenticatedRequestModel,
    @Body() body: CreateNoteBody
  ) {
    const { title, description } = body;
    const IdUser = req.user.id; 
    const note = await this.createNoteUseCase.execute({
      title,
      description: description ?? '',
      IdUser,
    });
    const user = await this.userRepository.findById(IdUser);

    if (user && user.email) {
      await this.mailerService.sendMail({
        to: user.email, // Envie o email para o usuário
        from: process.env.MAIL, // Endereço do remetente
        subject: 'Nota Criada ✔', // Assunto do email
        text: `Sua nota "${title}" foi criada com sucesso.`, // Corpo do email em texto puro
        html: `<b>Sua nota "${title}" foi criada com sucesso.</b>`, // Corpo do email em HTML
      });
    } else {
      console.error(`Email do usuário com ID ${user} não encontrado.`);
    }

    return NoteViewModel.toHttp(note);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() { title, description }: { title: string; description?: string },
  ) {
    const updatedNote = await this.updateNoteUseCase.execute({ id, title, description });
    return NoteViewModel.toHttp(updatedNote);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getNote(
    @Param('id') id: string,
  ) {
    const note = await this.getNoteIdUseCase.execute({ id });
    return NoteViewModel.toHttp(note);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteNote(
    @Param('id') id: string,
  ) {
    await this.deleteNoteUseCase.execute({ id });
    return { message: 'Note deleted successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const notes = await this.getNoteUseCase.execute();
    return AllNoteViewModel.toHttpList(notes);
  }
}
