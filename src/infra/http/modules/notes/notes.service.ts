import { Injectable } from '@nestjs/common';
import { CreateNoteBody } from './dto/createNoteBody';
import { UpdateNoteBody } from './dto/updateNoteBody';

@Injectable()
export class NotesService {
  create(createNoteDto: CreateNoteBody) {
    return 'This action adds a new note';
  }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteBody: UpdateNoteBody) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
