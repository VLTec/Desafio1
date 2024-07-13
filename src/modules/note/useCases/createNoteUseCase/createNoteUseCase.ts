import { Injectable } from '@nestjs/common';
import { INoteRepository } from '../../repositories/NoteRepository';
import { makeNote } from '../../factories/NoteFactory';
import { NoteException } from '../../exception/NoteException';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { EmailService } from 'src/modules/email/EmailService';

interface CreateNoteRequest {
  title: string;
  description?: string;
  userId: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(
    private noteRepository: INoteRepository,
    private userRepository: UserRepository,
    private emailService: EmailService
  ) {}

  async execute({ title, description, userId }: CreateNoteRequest) {
    if (title.trim() == '') {
      throw new NoteException('A Nota precisa de um título');
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NoteException('ID de usuário inválido');
    }

    const note = makeNote({
      title,
      description: description || '',
      userId,
    });

    await this.noteRepository.create(note);

    await this.emailService.sendEmail({
        from: "teste@gmail.com",
        to: user.email,
        subject: "Criação de Nota",
        text: "Uma nova nota foi criada em sua conta \n\n" + note.toString()
    })

    return note;
  }
}
