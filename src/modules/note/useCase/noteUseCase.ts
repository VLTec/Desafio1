import { Injectable } from '@nestjs/common';
import { NoteUpdateBody } from 'src/infra/http/modules/note/dtos/noteBody';
import { NoteNotFoundException } from '../exceptions/NoteNotFound';
import { NoteRepository } from '../repository/noteRepository';
import { MailService } from 'src/service/mail.service';

interface NoteProps {
  user_id: string;
  user_email: string;
  title: string;
  description?: string;
  note: string;
}

@Injectable()
export class NoteUseCase {
  constructor(
    private noteRepository: NoteRepository,
    private mailService: MailService,
  ) {}

  async create({ note, title, description, user_id, user_email }: NoteProps) {
    const createNote = await this.noteRepository.create({
      user_id,
      note,
      title,
      description,
    });

    await this.mailService.sendEmail(user_email);

    return createNote;
  }

  async findAll(user_id: string) {
    const allNotes = await this.noteRepository.findAll(user_id);

    return allNotes;
  }

  async findOne(id: number) {
    const note = await this.noteRepository.findOne(id);

    if (!note) throw new NoteNotFoundException();

    return note;
  }

  async update({ id, note, title, description }: NoteUpdateBody) {
    const existNote = await this.noteRepository.findOne(id);

    if (!existNote) throw new NoteNotFoundException();

    const updateNote = await this.noteRepository.update({
      id,
      note,
      title,
      description,
    });

    return updateNote;
  }

  async delete(id: number) {
    const existNote = await this.noteRepository.findOne(id);

    if (!existNote) throw new NoteNotFoundException();

    return this.noteRepository.delete(id);
  }
}
