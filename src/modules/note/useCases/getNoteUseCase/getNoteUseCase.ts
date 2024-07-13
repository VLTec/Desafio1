import { Injectable } from '@nestjs/common';
import { INoteRepository } from '../../repositories/NoteRepository';
import { NoteException } from '../../exception/NoteException';

interface IGetNoteRequest {
  idNote: string;
}

@Injectable()
export class GetNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute({ idNote }: IGetNoteRequest) {
    const note = await this.noteRepository.findById(idNote);

    if (!note) {
      throw new NoteException("Nota não foi encontrada");
    }

    return note;
  }
}
