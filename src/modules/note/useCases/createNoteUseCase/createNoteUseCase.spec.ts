import { NoteRepositoryInMemory } from "../../repositories/NoteRepositoryInMemory";
import { CreateNoteUseCase } from "./createNoteUseCase"

let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Create Note', () => {
    beforeEach(async () => {
        noteRepositoryInMemory = new NoteRepositoryInMemory()
        createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory, {
            async sendMail() {}
        })
    })

    it('should be able to create a note', async () => {
        const userId = 'example-user-id'
        const userEmail = 'user@example.com'

        expect(noteRepositoryInMemory.notes).toEqual([]);

        const note = await createNoteUseCase.execute({
            title: 'Example Title',
            description: 'Example Description',
            user: {
                id: userId,
                email: userEmail
            }
        })

        expect(noteRepositoryInMemory.notes).toEqual([note])
    })
})