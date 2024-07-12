import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { NoteBody } from './dtos/noteBody';
import { NoteUseCase } from 'src/modules/note/useCase/noteUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';

@Controller('notes')
export class NoteController {
  constructor(private noteUseCase: NoteUseCase) {}

  @Post()
  async createNote(
    @Body() body: NoteBody,
    @Request() req: AuthenticatedRequestModel,
  ) {
    const { note, title, description } = body;

    const createNote = this.noteUseCase.create({
      user_id: req.user.id,
      note,
      title,
      description,
    });

    return createNote;
  }

  @Get()
  async getAll(@Request() req: AuthenticatedRequestModel) {
    const user_id = req.user.id;

    const allNotes = this.noteUseCase.findAll(user_id);

    return allNotes;
  }

  //   @Get()
  //   async getOne() {}

  //   @Put()
  //   async update() {}

  //   @Delete()
  //   async delete() {}
}
