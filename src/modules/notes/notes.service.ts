// notes.service.ts

import { Injectable } from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from './note.dto';

@Injectable()
export class NotesService {
  private readonly notes: CreateNoteDto[] = [];

  create(createNoteDto: CreateNoteDto) {
    const newNote = {
      ...createNoteDto,
      id: (this.notes.length + 1).toString(),
      createdAt: new Date(),
    };
    this.notes.push(newNote);
    return newNote;
  }

  findAll() {
    return this.notes;
  }

  findOne(id: string) {
    return this.notes.find(note => note.id === id);
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      return null;
    }

    this.notes[noteIndex] = {
      ...this.notes[noteIndex],
      ...updateNoteDto,
    };

    return this.notes[noteIndex];
  }

  remove(id: string) {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      return null;
    }
    const deletedNote = this.notes.splice(noteIndex, 1);
    return deletedNote[0];
  }
}
