import { Injectable } from "@nestjs/common";
import { NoteRepository } from "../../repositories/NoteRepository";
import { NoteNotFoundException } from "../../exceptions/NoteNotFound";

@Injectable()
export class GetAllNotesUseCase {
    constructor(private noteRepository: NoteRepository) {}

    async execute() {
        const notes = await this.noteRepository.findAll();

        if (!notes) {
            throw new NoteNotFoundException();
        }

        return notes;
    }
}