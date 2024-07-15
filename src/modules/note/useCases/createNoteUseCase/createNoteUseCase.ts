import { Note } from "../../entities/Note";
import { NoteRepository } from "../../repositories/NoteRepository";
import { Injectable } from "@nestjs/common";

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
    ) {}

    async execute({ title, description, user: { id: createdBy, email } }: CreateNoteRequest) {
        const note = new Note({
            title,
            description,
            createdBy
        })

        await this.noteRepository.create(note)

        return note
    }
}