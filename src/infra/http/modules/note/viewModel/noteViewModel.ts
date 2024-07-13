import { Note } from "src/modules/note/entities/Note";

export class NoteViewModel {
    static toHttp({ createdAt, title, description, id, userId }: Note) {
        return {
            id,
            userId,
            title,
            description,
            createdAt
        }
    }
}