import { makeNote } from "../../factories/noteFactory";
import { NoteRepositoryInMemory } from "../../repositories/NoteRepositoryInMemory";
import { GetNoteUseCase } from "./getNoteUseCase";

let getNoteUseCase : GetNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Get note', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory();
        getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory);
    });

    it('Should be able to get a specific note', async() => {
        const note = makeNote()
        
        noteRepositoryInMemory.notes = [note];

        const foundNote = await getNoteUseCase.execute({
            id: note.id
        })


        expect(foundNote).toEqual(note);
    })
})