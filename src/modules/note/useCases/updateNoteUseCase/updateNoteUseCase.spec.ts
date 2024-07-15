import { NoteNotFound } from "../../exceptions/NoteNotFound";
import { makeNote } from "../../factories/noteFactory";
import { NoteRepositoryInMemory } from "../../repositories/NoteRepositoryInMemory"
import { UpdateNoteUseCase } from "./updateNoteUseCase";

let noteRepositoryInMemory: NoteRepositoryInMemory;
let updateNoteUseCase: UpdateNoteUseCase;

describe('Update Note', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory;
        updateNoteUseCase = new UpdateNoteUseCase(noteRepositoryInMemory, )
    })

    it('should update the note', async () => {
        const userId = 'example-user-id'
        const note = makeNote({
            createdBy: userId
        })

        noteRepositoryInMemory.notes = [note]
       
        expect(noteRepositoryInMemory.notes[0].updatedAt).toEqual(noteRepositoryInMemory.notes[0].createdAt)

        await new Promise(resolve => setTimeout(resolve, 1000))

        await updateNoteUseCase.execute({
            noteId: note.id,
            description: 'New description',
            title: 'New Title',
            userId: note.createdBy
        })

        expect(noteRepositoryInMemory.notes).toHaveLength(1)
        expect(noteRepositoryInMemory.notes[0].description).toBe('New description')
        expect(noteRepositoryInMemory.notes[0].title).toBe('New Title')
        expect(noteRepositoryInMemory.notes[0].updatedAt).not.toEqual(noteRepositoryInMemory.notes[0].createdAt)
    })

    it('should throw if the note is not found', async () => {
        const userId = 'example-user-id'

        const note = makeNote({
            createdBy: userId
        })

        noteRepositoryInMemory.notes = [note]

        expect(() => {
            return updateNoteUseCase.execute({
                title: "New Title",
                noteId: "invalid-note-id",
                userId: userId
            })
        }).rejects.toThrow(NoteNotFound)
    })

    it('should throw if the user is not the owner', async () => {
        const note = makeNote({})

        noteRepositoryInMemory.notes = [note]

        expect(() => {
            return updateNoteUseCase.execute({
                title: "New Title",
                noteId: note.id,
                userId: "invalid-user-id"
            })
        }).rejects.toThrow(NoteNotFound)
    })
})