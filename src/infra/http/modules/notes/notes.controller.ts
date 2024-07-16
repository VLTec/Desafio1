import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CreateNoteBody } from './dto/createNoteBody';
import { ApiTags } from '@nestjs/swagger';
import { NoteViewModel } from './viewModel/notesViewModel';
import { CurrentUser, Auth } from '../auth/decorators/currentUser';

import { CreateNoteUseCase } from 'src/modules/notes/useCases/createNoteUseCase/createNoteUseCase';
import { GetAllNoteUseCase } from 'src/modules/notes/useCases/getAllNoteUseCase/getAllNoteUseCase';
import { GetNoteByIdUseCase } from 'src/modules/notes/useCases/getNoteByIdUseCase/getNoteByIdUseCase';
import { UpdateNoteUseCase } from 'src/modules/notes/useCases/updateNoteUseCase/updateNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/notes/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { MeilerService } from 'src/modules/meiler/service/meiler.service';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly getAllNoteUseCase: GetAllNoteUseCase,
    private readonly getNoteByIdUseCase: GetNoteByIdUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase,
    private readonly meilerService: MeilerService,
  ) {}

  @Post()
  async create(@Body() body: CreateNoteBody, @CurrentUser() user: Auth) {
    const { title, description } = body

    const note = await this.createNoteUseCase.execute({
      title,
      description,
      user_id: user.id,
    })

    const message = await this.meilerService.sendEmail({
      from: {
        name: "suporte@desafioApp.com.br",
        address: "DesafioApp",
      },
      recipients: [{
        name: user.name,
        address: user.email
      }],
      subject: 'Suporte | Nova nota criada',
      html: `<p>Nota ${title} Criada com sucesso!</p>`,
    })

    console.log('message =>> ', message);

    return NoteViewModel.toHttp(note)
  }

  @Get()
  async findAll(@CurrentUser() user: Auth) {
    return this.getAllNoteUseCase.execute({
      user_id: user.id,
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.getNoteByIdUseCase.execute({id});
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: CreateNoteBody,
    @CurrentUser() user: Auth,
  ) {
    const { title, description } = body
    return await this.updateNoteUseCase.execute({
      userId: user.id,
      id,
      title,
      description,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteNoteUseCase.execute({id});
  }
}
