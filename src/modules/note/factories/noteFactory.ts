import { Note } from "../entities/Note"; 

type Override = Partial<Note>;

export const makeNote = ({id, ...override}: Override = {}) => {
    return new Note(
        {
            title: "Nota 1",
            description: "Descrição da Nota 1",
            userId: "4fa521br-z669-052k-0312-5814g41w4260", // random uuid
            ...override,
        },
        id
    )
}