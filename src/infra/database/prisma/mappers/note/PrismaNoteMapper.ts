import { Note } from "src/modules/note/entities/Note";
import { Note as NoteRaw } from '@prisma/client'

export class PrismaNoteMapper {
    static toPrisma({
        createdAt,
        createdBy,
        description,
        id,
        title,
        updatedAt
    }: Note): NoteRaw {
        return {
            id,
            createdAt,
            description,
            title,
            createdBy,
            updatedAt
        }
    }

    static toDomain({
        id,
        title,
        description,
        createdBy,
        updatedAt,
        createdAt
    }: NoteRaw) {
        return new Note({
            title,
            createdBy,
            description,
            createdAt,
            updatedAt
        }, id)
    }
}