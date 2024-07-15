import { Injectable } from "@nestjs/common";
import { NoteRepository } from "../../repositories/NoteRepository";

interface GetNotesRequest {
    userId: string;
}

@Injectable()
export class GetNotesUseCase {
    constructor(
        private noteRepository: NoteRepository
    ) {}

    async execute({ userId }: GetNotesRequest) {
        return this.noteRepository.findByUserId(userId)
    }
}