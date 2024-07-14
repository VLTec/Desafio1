import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto } from './note.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger'; // Importações adicionadas

@ApiTags('notes') // Tag para agrupar endpoints relacionados a notes no Swagger
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOperation({ summary: 'Create a new note' })
  @ApiCreatedResponse({ description: 'The note has been successfully created.' })
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    const newNote = this.notesService.create(createNoteDto);
    // Enviar email aqui (não implementado diretamente no exemplo)
    return newNote;
  }

  @ApiOperation({ summary: 'Retrieve all notes' })
  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a specific note by ID' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    const note = this.notesService.findOne(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  @ApiOperation({ summary: 'Update a specific note by ID' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const updatedNote = this.notesService.update(id, updateNoteDto);
    if (!updatedNote) {
      throw new NotFoundException('Note not found');
    }
    return updatedNote;
  }

  @ApiOperation({ summary: 'Delete a specific note by ID' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedNote = await this.notesService.remove(id);
    if (!deletedNote) {
      throw new NotFoundException('Note not found');
    }
    return deletedNote;
  }
}
