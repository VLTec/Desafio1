import { Injectable } from "@nestjs/common";
import { NoteRepository } from "../../repositories/NoteRepository";
import { NoteNotFoundException } from "../../exceptions/NoteNotFound";

interface DeleteNoteRequest {
    id: string;
}

@Injectable()
export class DeleteNoteUseCase {
    constructor(private noteRepository: NoteRepository) {}

    async execute({ id }: DeleteNoteRequest) {
        const note = await this.noteRepository.findById(id);

        if (!note) {
            throw new NoteNotFoundException()
        }

        await this.noteRepository.delete(id);
    }
}