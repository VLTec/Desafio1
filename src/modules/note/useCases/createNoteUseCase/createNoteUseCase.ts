import { Note } from "../../entities/Note";
import { NoteRepository } from "../../repositories/NoteRepository";
import { Injectable } from "@nestjs/common";
import { MailService } from "src/modules/mail/mail-service";

interface CreateNoteRequest {
    title: string;
    description?: string;   
    user: {
        id: string;
        email: string;
    }
}

@Injectable()
export class CreateNoteUseCase {
    constructor(
        private noteRepository: NoteRepository,
        private mailService: MailService,
    ) {}

    async execute({ title, description, user: { id: createdBy, email } }: CreateNoteRequest) {
        const note = new Note({
            title,
            description,
            createdBy
        })

        await this.noteRepository.create(note)

        this.mailService.sendMail({
            content: 'Nota criada',
            subject: 'Nota criada',
            to: email
        })

        return note
    }
}