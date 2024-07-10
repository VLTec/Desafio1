import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateNoteBody } from './dto/createNoteBody';
import { UpdateNoteBody } from './dto/updateNoteBody';
import { ApiTags } from '@nestjs/swagger';
import { CreateNoteUseCase } from 'src/modules/notes/useCases/createNoteUseCase/createNoteUseCase';
import { NoteViewModel } from './viewModel/notesViewModel';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly createNoteUseCase: CreateNoteUseCase) {}

  @Post()
  async create(@Body() body: CreateNoteBody) {
    const { title, description, user_id } = body

    const note = await this.createNoteUseCase.execute({
      title,
      description,
      user_id,
    })

    return NoteViewModel.toHttp(note)
  }

  // @Get()
  // findAll() {
  //   return this.notesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNoteBody: UpdateNoteBody) {
  //   return this.notesService.update(+id, updateNoteBody);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notesService.remove(+id);
  // }
}
