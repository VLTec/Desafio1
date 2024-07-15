import { makeNote } from "../../factories/noteFactory";
import { NoteRepositoryInMemory } from "../../repositories/NoteRepositoryInMemory"
import { DeleteNoteUseCase } from "./deleteNoteUseCase";
import { NoteNotFound } from "../../exceptions/NoteNotFound";

let noteRepositoryInMemory: NoteRepositoryInMemory;
let deleteNoteUseCase: DeleteNoteUseCase;

describe('Delete Note', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory()
        deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory)
    })

    it('should delete the note', async () => {
        const userId = 'example-user-id'
        const note = makeNote({
            createdBy: userId
        })

        const note2 = makeNote({})

        noteRepositoryInMemory.notes = [note, note2]

        expect(noteRepositoryInMemory.notes).toEqual([note, note2])

        await deleteNoteUseCase.execute({
            noteId: note.id,
            userId
        })

        expect(noteRepositoryInMemory.notes).toHaveLength(1)
        expect(noteRepositoryInMemory.notes).toEqual([note2])
    })

    it('should throw if the note is not found', async () => {
        const userId = 'example-user-id'
        const note = makeNote({
            id: 'example-id',
            createdBy: userId
        })

        noteRepositoryInMemory.notes = [note]
        
        expect(() => {
            return deleteNoteUseCase.execute({
                noteId: 'invalid-id',
                userId
            })
        }).rejects.toThrow(NoteNotFound)
    })

    it('should throw if the user is not the author of the note', async () => {
        const userId = 'example-user-id'
        const note = makeNote({
            createdBy: userId
        })

        noteRepositoryInMemory.notes = [note]

        expect(() => {
            return deleteNoteUseCase.execute({
                noteId: note.id,
                userId: 'invalid-user-id'
            })
        }).rejects.toThrow(NoteNotFound)
    })
})