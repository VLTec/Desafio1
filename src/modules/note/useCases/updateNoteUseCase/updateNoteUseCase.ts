import { Injectable } from "@nestjs/common";
import { NoteRepository } from "../../repositories/NoteRepository";
import { Note } from "../../entities/Note";
import { NoteNotFoundException } from "../../exceptions/NoteNotFound";

interface UpdateNoteRequest {
    id: string;
    title?: string;
    description?: string;
    userId: string;
}

@Injectable()
export class UpdateNoteUseCase {
    constructor(private noteRepository: NoteRepository) {}

    async execute({ id, title, description, userId }: UpdateNoteRequest) {
        const note = await this.noteRepository.findById(id);

        if (!note) {
            throw new NoteNotFoundException();
        }

        if (title) {
            note.title = title;
        }

        if (description) {
            note.description = description;
        }

        const updateNote = new Note({
            title: title || "",
            description: description || "",
            userId: userId
        })

        await this.noteRepository.update(updateNote);

        return updateNote;
    }
}