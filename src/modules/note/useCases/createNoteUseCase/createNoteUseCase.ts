import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../entities/Note';
import { InvalidTokenFoundException } from '../../exceptions/InvalidToken';

interface CreateNoteRequest {
  title: string;
  description: string;
  IdUser: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ title, description, IdUser }: CreateNoteRequest) {
    if(IdUser === undefined){
      throw new InvalidTokenFoundException();
    }

    const note = new Note({
      title,
      description,
      IdUser,
    });

    await this.noteRepository.create(note);

    return note;
  }
}
