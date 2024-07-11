import { ApiTags } from '@nestjs/swagger';
import { CreateNoteBody } from './dtos/createNoteBody';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NoteViewModel } from './viewModel/noteViewModel';
import { CreateNoteUseCase } from '@modules/notes/useCases/createNoteUseCase/createNoteUseCase';
import { Auth, CurrentUser } from '../auth/decorators/currentUser';
import { GetNoteByIdUseCase } from '@/modules/notes/useCases/getNoteByIdUseCase/getNoteByIdUseCase';
import { GetAllUserNotesUseCase } from '@/modules/notes/useCases/getAllUserNotesUseCase/getAllUserNotesUseCase';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private getNoteByIdUseCase: GetNoteByIdUseCase,
    private getAllUserNotesUseCase: GetAllUserNotesUseCase,
  ) {}

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

  @Get(':id')
  async getNote(@Param('id') id: string, @CurrentUser() user: Auth) {
    const note = await this.getNoteByIdUseCase.execute({
      userId: user.id,
      noteId: id,
    });

    return NoteViewModel.toHttp(note);
  }

  @Get()
  async getNotes(@CurrentUser() user: Auth) {
    const notes = await this.getAllUserNotesUseCase.execute({
      userId: user.id,
    });

    return notes.map(NoteViewModel.toHttp);
  }
}
