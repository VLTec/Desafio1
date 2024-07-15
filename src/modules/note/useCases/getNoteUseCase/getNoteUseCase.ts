import { Injectable } from "@nestjs/common";
import { NoteNotFound } from "../../exceptions/NoteNotFound";
import { NoteRepository } from "../../repositories/NoteRepository";

interface GetNoteRepository {
    noteId: string;
    userId: string;
}

@Injectable()
export class GetNoteUseCase {
    constructor (
        private noteRepository: NoteRepository
    ) {}

    async execute({ noteId, userId }: GetNoteRepository) {
        const note = await this.noteRepository.findById(noteId)

        if (!note) {
            throw new NoteNotFound();
        }

        // Don't show forbidden message to prevent to give more information than necessary
        if (note.createdBy !== userId) {
            throw new NoteNotFound();
        }

        return note
    }
}