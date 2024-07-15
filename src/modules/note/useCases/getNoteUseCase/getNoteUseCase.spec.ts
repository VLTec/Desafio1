import { NoteRepositoryInMemory } from "../../repositories/NoteRepositoryInMemory"
import { GetNoteUseCase } from "./getNoteUseCase"
import { makeNote } from "../../factories/noteFactory"
import { NoteNotFound } from "../../exceptions/NoteNotFound"

let noteRepositoryInMemory: NoteRepositoryInMemory
let getNoteUseCase: GetNoteUseCase

const userId1 = 'user-id-1'

describe('Get Note', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory()
        getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory)
    })

    it('should return the note', async () => {
        const note = makeNote({
            createdBy: userId1
        })

        noteRepositoryInMemory.notes = [note]

        const returnedNote = await getNoteUseCase.execute({
            noteId: note.id,
            userId: userId1
        })

        expect(returnedNote).toEqual(note)
    })

    it('should throw if the note is not found', async () => {
        expect(async () => {
            return getNoteUseCase.execute({
                noteId: 'example-note-id',
                userId: userId1
            })
        }).rejects.toThrow(NoteNotFound)
    })

    it('should throw if the user is not the author of the note', async () => {
        const userId2 = 'example-user-id-2'

        const note = makeNote({
            createdBy: userId2
        })

        noteRepositoryInMemory.notes = [note]

        expect(async () => {
            return getNoteUseCase.execute({
                noteId: note.id,
                userId: userId1
            })
        }).rejects.toThrow(NoteNotFound)
    })
})