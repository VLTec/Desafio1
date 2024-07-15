import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { createNoteBody } from './dtos/createNoteBody';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { NoteViewModel } from './viewModel/noteViewModel';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { FindAllNotesUseCase } from 'src/modules/note/useCases/findAllNotesUseCase/findAllNotesUseCase';

@ApiTags('note')
@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private findAllNotesUseCase: FindAllNotesUseCase,
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
}
