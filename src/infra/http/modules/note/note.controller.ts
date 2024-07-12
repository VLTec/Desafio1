import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { NoteUseCase } from 'src/modules/note/useCase/noteUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { NoteBody } from './dtos/noteBody';

@Controller('notes')
export class NoteController {
  constructor(private noteUseCase: NoteUseCase) {}

  @Post()
  async createNote(
    @Body() body: NoteBody,
    @Request() req: AuthenticatedRequestModel,
  ) {
    const { note, title, description } = body;

    return this.noteUseCase.create({
      user_id: req.user.id,
      note,
      title,
      description,
    });
  }

  @Get()
  async getAll(@Request() req: AuthenticatedRequestModel) {
    const user_id = req.user.id;

    return this.noteUseCase.findAll(user_id);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.noteUseCase.findOne(id);
  }

  @Put(':id')
  async update(@Body() body: NoteBody, @Param('id', ParseIntPipe) id: number) {
    const { note, title, description } = body;

    return this.noteUseCase.update({
      id,
      note,
      title,
      description,
    });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.noteUseCase.delete(id);
  }
}
