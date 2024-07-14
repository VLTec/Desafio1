import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NoteService } from '../note/noteService';
import { CreateNoteDto } from '../note/dtos/createNote.dto';
import { UpdateNoteDto } from '../note/dtos/updateNote.dto';
import { Note } from '../note/entities/noteEntity';


@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async create(@Body() data: CreateNoteDto): Promise<Note> {
    const note = await this.noteService.create(data);
    // Here, you would send an email (e.g., using a mail service)
    console.log('note created');
    return note;
  }

  @Get()
  async findAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Note | null> {
    return this.noteService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateNoteDto): Promise<Note> {
    return this.noteService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.noteService.delete(id);
  }
}
