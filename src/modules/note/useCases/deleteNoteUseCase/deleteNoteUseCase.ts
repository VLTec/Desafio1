import { Injectable } from "@nestjs/common";
import { NoteNotFound } from "../../exceptions/NoteNotFound";
import { NoteRepository } from "../../repositories/NoteRepository";

interface DeleteNoteRequest {
    noteId: string;
    userId: string;
}

@Injectable()
export class DeleteNoteUseCase {
    constructor(
        private noteRepository: NoteRepository
    ) {}

    async execute({ noteId, userId }: DeleteNoteRequest) {
        const note = await this.noteRepository.findById(noteId)

        if (!note) {
            throw new NoteNotFound()
        }

        if (note.createdBy !== userId) {
            throw new NoteNotFound()
        }

        await this.noteRepository.delete(noteId)
    }
}