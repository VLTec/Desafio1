import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { GetAllNotesUseCase } from 'src/modules/note/useCases/getAllNotesUseCase/getAllNotesUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { UpdateNoteUseCase } from 'src/modules/note/useCases/updateNoteUseCase/updateNoteUseCase';
import { CreateNoteBody } from './dtos/createNoteDto';
import { NoteViewModel } from './viewModel/userViewModel';
import { CurrentUser } from '../auth/decorators/CurrentUser';
import { AuthEntity } from '../auth/dtos/Auth';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly getAllNoteUseCase: GetAllNotesUseCase,
    private readonly getNoteByIdUseCase: GetNoteUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateNoteBody, @CurrentUser() user: AuthEntity) {
    const { title, description } = body;

    const note = await this.createNoteUseCase.execute({
      title,
      description,
      userId: user.userId,
    });

    return NoteViewModel.toHttp(note);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: CreateNoteBody,
  ) {
    const { title, description } = body;
    return await this.updateNoteUseCase.execute({
      id,
      title,
      description,
    });
  }

  @Get()
  async findAll() {
    return this.getAllNoteUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.getNoteByIdUseCase.execute({ idNote: id });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteNoteUseCase.execute({ idNote: id });
  }  

}
