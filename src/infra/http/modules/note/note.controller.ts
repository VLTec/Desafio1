import { ApiTags } from '@nestjs/swagger';
import { CreateNoteBody } from './dtos/createNoteBody';
import { Body, Controller, Post } from '@nestjs/common';
import { NoteViewModel } from './viewModel/noteViewModel';
import { CreateNoteUseCase } from '@modules/notes/useCases/createNoteUseCase/createNoteUseCase';
import { Auth, CurrentUser } from '../auth/decorators/currentUser';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
  constructor(private createNoteUseCase: CreateNoteUseCase) {}

  @Post()
  async createNote(@Body() body: CreateNoteBody, @CurrentUser() user: Auth) {
    const { title, description } = body;

    const note = await this.createNoteUseCase.execute({
      userId: user.id,
      title,
      description,
    });

    return NoteViewModel.toHttp(note);
  }
}
