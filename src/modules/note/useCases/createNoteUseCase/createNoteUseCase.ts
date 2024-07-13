import { Injectable } from '@nestjs/common';
import { INoteRepository } from '../../repositories/NoteRepository';
import { makeNote } from '../../factories/NoteFactory';
import { NoteException } from '../../exception/NoteException';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';

interface CreateNoteRequest {
  title: string;
  description?: string;
  userId: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(
    private noteRepository: INoteRepository,
    private userRepository: UserRepository
  ) {}

  async execute({ title, description, userId }: CreateNoteRequest) {

    if (title.trim() == "") {
       throw new NoteException("A Nota precisa de um título")
    } 

    const user = this.userRepository.findById(userId)

    if (!user) {
       throw new NoteException("ID de usuário inválido")
    }

    const note = makeNote({
      title,
      description: description || '',
      userId,
    });

    await this.noteRepository.create(note);

    return note;
  }
}
