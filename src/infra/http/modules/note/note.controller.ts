import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { createNoteBody } from './dtos/createNoteBody';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { NoteViewModel } from './viewModel/noteViewModel';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { FindAllNotesUseCase } from 'src/modules/note/useCases/findAllNotesUseCase/findAllNotesUseCase';
import { findByIdNoteParams } from './dtos/findByIdNoteParams';
import { FindByIdNoteUseCase } from 'src/modules/note/useCases/findByIdNoteUseCase/findByIdNoteUseCase';
import { UpdateNoteUseCase } from 'src/modules/note/useCases/updateNoteUseCase/updateNoteUseCase';
import { updateNoteBody } from './dtos/updateNoteBody';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';

@ApiTags('note')
@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private findAllNotesUseCase: FindAllNotesUseCase,
    private findByIdNoteUseCase: FindByIdNoteUseCase,
    private updateNoteUseCase: UpdateNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
  ) {}

  @Post()
  async createNote(
    @Body() body: createNoteBody,
    @Request() request: AuthenticatedRequestModel,
  ) {
    const { id } = request.user;
    const { title, description } = body;

    const note = await this.createNoteUseCase.execute({
      title,
      description,
      userId: id,
    });

    return NoteViewModel.toHttp(note);
  }

  @Get()
  async findAll(@Request() request: AuthenticatedRequestModel) {
    const {
      user: { id },
    } = request;

    const notes = await this.findAllNotesUseCase.execute({ userId: id });

    return notes.map((note) => NoteViewModel.toHttp(note));
  }

  @Get(':id')
  async findById(
    @Param() params: findByIdNoteParams,
    @Request() request: AuthenticatedRequestModel,
  ) {
    const { id } = params;
    const { id: userId } = request.user;

    const note = await this.findByIdNoteUseCase.execute(id, userId);

    return NoteViewModel.toHttp(note);
  }

  @Put(':id')
  async updateNote(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: updateNoteBody,
    @Param() params,
  ) {
    const { id } = params;
    const { id: userId } = request.user;
    const { title, description } = body;

    await this.updateNoteUseCase.execute({ id, title, description, userId });
  }

  @Delete(':id')
  async deleteNote(
    @Request() request: AuthenticatedRequestModel,
    @Param() params,
  ) {
    const { id } = params;
    const { id: userId } = request.user;

    await this.deleteNoteUseCase.execute(id, userId);
  }
}
