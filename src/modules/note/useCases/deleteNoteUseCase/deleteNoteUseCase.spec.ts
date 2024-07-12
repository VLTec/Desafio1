import { makeNote } from "../../factories/noteFactory";
import { NoteRepositoryInMemory } from "../../repositories/NoteRepositoryInMemory";
import { DeleteNoteUseCase } from "./deleteNoteUseCase";

let deleteNoteUseCase : DeleteNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Delete note', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory();
        deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory);
    });

    it('Should be able to delete note', async() => {
        const note = makeNote();

        noteRepositoryInMemory.notes = [note];

        await deleteNoteUseCase.execute({ 
            id: note.id
        });

        expect(noteRepositoryInMemory.notes).toEqual([])
    })
})