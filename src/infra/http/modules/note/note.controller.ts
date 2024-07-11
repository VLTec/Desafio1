import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { NoteBody } from './dtos/noteBody';
import { NoteUseCase } from 'src/modules/note/useCase/noteUseCase';

@Controller('notes')
export class NoteController {
  constructor(private noteUseCase: NoteUseCase) {}

  @Post()
  async createNote(@Body() body: NoteBody) {
    const { note, title, description } = body;

    const createNote = this.noteUseCase.create({
      note,
      title,
      description,
    });

    return createNote;
  }

  //   @Get()
  //   async getAll() {}

  //   @Get()
  //   async getOne() {}

  //   @Put()
  //   async update() {}

  //   @Delete()
  //   async delete() {}
}
