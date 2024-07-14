import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto } from './note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
   create(@Body() createNoteDto: CreateNoteDto) {
    const newNote = this.notesService.create(createNoteDto);
    // Enviar email aqui (não implementado diretamente no exemplo)
    return newNote;
  }

  @Get()
   findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
   findOne(@Param('id') id: string) {
    const note = this.notesService.findOne(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  @Put(':id')
   update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const updatedNote = this.notesService.update(id, updateNoteDto);
    if (!updatedNote) {
      throw new NotFoundException('Note not found');
    }
    return updatedNote;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedNote = await this.notesService.remove(id);
    if (!deletedNote) {
      throw new NotFoundException('Note not found');
    }
    return deletedNote;
  }
}
