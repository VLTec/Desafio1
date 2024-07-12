import { Injectable } from '@nestjs/common';

import { Note } from '../../entities/Note';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { NoteRepository } from '../../repositories/NoteRepository';
import { MeilerService } from 'src/modules/meiler/service/meiler.service';

interface CreateNoteRequest {
  title: string;
  description: string;
  user_id: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(
    private noteRepository: NoteRepository,
    private userRepository: UserRepository,
    private meilerService: MeilerService,
  ) {}

  async execute({ title, description, user_id }: CreateNoteRequest) {

    if (!title) {
      throw new Error('Title is required')
    }

    const note = new Note({
      title,
      description,
      user_id,
    });

    await this.noteRepository.create(note);

    const user = await this.userRepository.findById(user_id)
    
    if (!user?.email) {
      throw new Error('Email user not found')
    }

    const { name, email } = user

    const message = await this.meilerService.sendEmail({
      from: {
        name: "suporte@desafioApp.com.br",
        address: "DesafioApp",
      },
      recipients: [{
        name: name,
        address: email
      }],
      subject: 'Suporte | Nova nota criada',
      html: `<p>Nota ${title} Criada com sucesso!</p>`,
    })

    console.log('message =>> ', message);

    return note;
  }
}
