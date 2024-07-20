import { Injectable } from "@nestjs/common";
import { NoteRepository } from "../../repositories/NoteRepository";
import { NoteNotFoundException } from "../../exceptions/NoteNotFound";

interface getAllNotesRequest {
    userId: string;
}

@Injectable()
export class GetAllNotesUseCase {
    constructor(private noteRepository: NoteRepository) {}

    async execute({ userId }: getAllNotesRequest) {
        const notes = await this.noteRepository.findAll(userId);

        if (!notes) {
            throw new NoteNotFoundException();
        }

        return notes;
    }
}