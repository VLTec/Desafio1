import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, HttpCode} from '@nestjs/common';
import { NotesService } from './notes.services';
import { Note } from '@prisma/client';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(@Body() noteData: { title: string; description?: string }): Promise<Note> {
    return this.notesService.createNote({
      title: noteData.title,
      description: noteData.description,
      user: {
        connect: { id: 1 }
      },
    });
  }

  @Get()
  async getNotes(): Promise<Note[]> {
    return this.notesService.getNotes();
  }

  @Get(':id')
  async getNoteById(@Param('id') id: string): Promise<Note> {
    try {
      return await this.notesService.getNoteById(Number(id));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() noteData: { title: string; description?: string },
  ): Promise<Note> {
    return this.notesService.updateNote(Number(id), noteData);
  }

  @Delete(':id')
  @HttpCode(202)
  async deleteNote(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    await this.notesService.deleteNote(Number(id));
    return { message: 'Deletado com sucesso' };
  }
}
