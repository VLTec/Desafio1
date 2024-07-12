import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/createNoteUseCase';
import { NoteViewModel } from './viewModel/noteViewModel';
import { ApiTags } from '@nestjs/swagger';
import { Note } from 'src/modules/note/entities/Note';
import { GetNotesUseCase } from 'src/modules/note/useCases/createUserUseCase/getAllNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/getNoteUseCase';
import { UpdateNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/updateNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/deleteNoteUseCase';

@ApiTags('note')
@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private getNotesUseCase: GetNotesUseCase,
    private getNoteUseCase: GetNoteUseCase,
    private updateNoteUseCase: UpdateNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
  ) {}

  @Post()
  async createNote(@Body() body) {
    const note = await this.createNoteUseCase.execute(body);
    return NoteViewModel.toHttp(note);
  }

  @Get()
  async getAllNotes() {
    const notes = await this.getNotesUseCase.execute();
    return notes.map((note) => NoteViewModel.toHttp(note));
  }

  @Get(':id')
  async getNoteById(@Param('id') id: string) {
    const note = await this.getNoteUseCase.execute(id);

    return NoteViewModel.toHttp(note);
  }

  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() body) {

    const payload = {
      id,
      title: body.title,
      content: body.content,
    };

    try {
      const note = await this.updateNoteUseCase.execute(payload);
      return NoteViewModel.toHttp(note);
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    const note = await this.deleteNoteUseCase.execute(id);

    return { message: 'registro deletado com sucesso' };
  }
}
