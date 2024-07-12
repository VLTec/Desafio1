import { Injectable } from "@nestjs/common";
import { NoteRepository } from "../../repositories/NoteRepository";
import { NoteNotFoundException } from "../../exceptions/NoteNotFound";

interface GetNoteRequest {
    id: string;
}

@Injectable()
export class GetNoteUseCase {
    constructor(private noteRepository: NoteRepository) {}

    async execute({ id }: GetNoteRequest) {
        const note = await this.noteRepository.findById(id);

        if (!note) {
            throw new NoteNotFoundException();
        }

        return note;
    }
}