import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { createNoteBody } from './dtos/createNoteBody';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/createNoteUseCase';
import { NoteViewModel } from './viewModel/noteViewModel';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';

@ApiTags('note')
@Controller('notes')
export class NoteController {
  constructor(private createNoteUseCase: CreateNoteUseCase) {}

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
}
