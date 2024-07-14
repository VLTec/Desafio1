import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from '../../modules/note/dtos/createNote.dto';
import { UpdateNoteDto } from '../../modules/note/dtos/updateNote.dto';
import { Note } from '../../modules/note/entities/noteEntity';
import { CreateNoteUseCase } from '../../modules/note/useCases/createNote';
import { RetrieveNotesUseCase } from '../../modules/note/useCases/retrieveNotes';
import { RetrieveNoteByIdUseCase } from '../../modules/note/useCases/retrieveNoteById';
import { UpdateNoteUseCase } from '../../modules/note/useCases/updateNote';
import { DeleteNoteUseCase } from '../../modules/note/useCases/deleteNote';
import { MailService } from '../mail/mailService';

@Injectable()
export class NoteService {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private retrieveNotesUseCase: RetrieveNotesUseCase,
    private retrieveNoteByIdUseCase: RetrieveNoteByIdUseCase,
    private updateNoteUseCase: UpdateNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
    private mailService: MailService,
  ) {}

  async create(data: CreateNoteDto): Promise<Note> {
    const note = await this.createNoteUseCase.execute(data);
    await this.mailService.sendMail('user@example.com', 'Note Created', 'Your note has been created');
    return note;
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
