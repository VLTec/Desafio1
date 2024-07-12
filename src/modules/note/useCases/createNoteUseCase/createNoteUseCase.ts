import { Injectable } from "@nestjs/common";
import { NoteRepository } from "../../repositories/NoteRepository";
import { Note } from "../../entities/Note";

interface CreateNoteRequest {
    title: string;
    description?: string;
    userId: string;
}

@Injectable()
export class CreateNoteUseCase {
    constructor(private noteRepository: NoteRepository) {}

    async execute({ title, description, userId }: CreateNoteRequest) {
        const note = new Note({
            title,
            description: description || "",
            userId
        });

        await this.noteRepository.create(note);

        return note;
    }
}