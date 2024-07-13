import { Note } from "src/modules/note/entities/Note";
import { Note as NoteRaw } from "@prisma/client";

export class PrismaNoteMapper {
    static toPrisma({
        createdAt,
        id,
        title,
        description,
        userId,
        updatedAt
    }: Note): NoteRaw {
        return {
            createdAt,
            id,
            title,
            description,
            userId,
            updatedAt
        };
    }

    static  toDomain({
        createdAt,
        id,
        title,
        description,
        userId,
        updatedAt
    }: NoteRaw): Note {
        return new Note({
            createdAt,
            title,
            description,
            userId,
            updatedAt
        },
            id
        )
    }
}