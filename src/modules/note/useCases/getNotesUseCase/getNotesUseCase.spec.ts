import { NoteRepositoryInMemory } from "../../repositories/NoteRepositoryInMemory"
import { GetNotesUseCase } from "./getNotesUseCase";
import { makeNote } from "../../factories/noteFactory";

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getNotesUseCase: GetNotesUseCase

describe('Get Notes', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory();
        getNotesUseCase = new GetNotesUseCase(noteRepositoryInMemory)
    })

    it('should return the notes created by the user', async () => {
        const userId1 = 'example-user-id-1'
        const userId2 = 'example-user-id-2'

        const note1 = makeNote({
            createdBy: userId1
        })

        const note2 = makeNote({
            createdBy: userId2
        })

        noteRepositoryInMemory.notes = [note1, note2]

        const notes = await getNotesUseCase.execute({
            userId: userId1
        })

        expect(notes).toHaveLength(1)
        expect(notes[0]).toEqual(note1)
    })

    it('should return empty array if the user have not created notes', async () => {
        const note = makeNote({
            createdBy: 'example-id'
        })

        noteRepositoryInMemory.notes = [note]

        const notes = await getNotesUseCase.execute({
            userId: 'example-user-id'
        })

        expect(notes).toHaveLength(0)
    })
})