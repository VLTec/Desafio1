import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/createNoteUseCase';
import { NoteViewModel } from './viewModel/noteViewModel';
import { ApiTags } from '@nestjs/swagger';
import { GetNotesUseCase } from 'src/modules/note/useCases/createUserUseCase/getAllNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/getNoteUseCase';
import { UpdateNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/updateNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/deleteNoteUseCase';
import { sendEmail } from 'src/services/sendMail';
import { CreateNoteDto, UpdateNoteDto } from './dtos/note.dto';

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
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    const note = await this.createNoteUseCase.execute(createNoteDto);
    sendEmail(note?.title);
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
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    const payload = {
      id,
      ...updateNoteDto,
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
    await this.deleteNoteUseCase.execute(id);
    return { message: 'registro deletado com sucesso' };
  }
}
