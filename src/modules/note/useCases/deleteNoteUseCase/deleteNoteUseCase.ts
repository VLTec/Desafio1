import { Injectable } from '@nestjs/common';
import { INoteRepository } from '../../repositories/NoteRepository';
import { NoteException } from '../../exception/NoteException';

interface IDeleteNoteRequest {
  idNote: string;
}

@Injectable()
export class DeleteNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute({ idNote }: IDeleteNoteRequest ) {
    const note = await this.noteRepository.findById(idNote)
    
    if (!note) {
       throw new NoteException("Nota não foi encontrada")
    }

    await this.noteRepository.delete(idNote);
  }
}
