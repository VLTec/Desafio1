import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from '../note/dtos/createNote.dto';
import { UpdateNoteDto } from '../note/dtos/updateNote.dto';
import { Note } from '../note/entities/noteEntity';
import { CreateNoteUseCase } from '../note/useCases/createNote';
import { RetrieveNotesUseCase } from '../note/useCases/retrieveNotes';
import { RetrieveNoteByIdUseCase } from '../note/useCases/retrieveNoteById';
import { UpdateNoteUseCase } from '../note/useCases/updateNote';
import { DeleteNoteUseCase } from '../note/useCases/deleteNote';

@Injectable()
export class NoteService {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private retrieveNotesUseCase: RetrieveNotesUseCase,
    private retrieveNoteByIdUseCase: RetrieveNoteByIdUseCase,
    private updateNoteUseCase: UpdateNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
  ) {}

  create(data: CreateNoteDto): Promise<Note> {
    return this.createNoteUseCase.execute(data);
  }

  findAll(): Promise<Note[]> {
    return this.retrieveNotesUseCase.execute();
  }

  findOne(id: number): Promise<Note | null> {
    return this.retrieveNoteByIdUseCase.execute(id);
  }

  update(id: number, data: UpdateNoteDto): Promise<Note> {
    return this.updateNoteUseCase.execute(id, data);
  }

  delete(id: number): Promise<void> {
    return this.deleteNoteUseCase.execute(id);
  }
}
