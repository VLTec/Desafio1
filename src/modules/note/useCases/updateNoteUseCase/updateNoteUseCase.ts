import { Injectable } from "@nestjs/common";
import { Note } from "../../entities/Note";
import { NoteNotFound } from "../../exceptions/NoteNotFound";
import { NoteRepository } from "../../repositories/NoteRepository";

interface UpdateNoteRequest {
    noteId: string;
    userId: string
    title: string;
    description?: string;
}

@Injectable()
export class UpdateNoteUseCase {
    constructor(
        private noteRepository: NoteRepository,
    ) {}

    async execute({ title, description = "", noteId, userId }: UpdateNoteRequest) {
        const noteExists = await this.noteRepository.findById(noteId)

        if (!noteExists) {
            throw new NoteNotFound()
        }

        if (noteExists.createdBy !== userId) {
            throw new NoteNotFound()
        }

        const note = new Note({
            title,
            description,
            createdBy: userId,
            createdAt: noteExists.createdAt,
            updatedAt: new Date(),
        }, noteId)

        await this.noteRepository.update(note)
    }
}