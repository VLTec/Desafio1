import { Note } from "../entities/Note"

type Override = Partial<Note>

export const makeNote = ({ id, ...override }: Override = {}) => {
    return new Note(
        {
            createdBy: "example-user-id",
            title: "Example Note",
            description: "Example description",
            ...override,
        },
        id,
    )
}