import { makeNote } from "../../factories/noteFactory";
import { NoteRepositoryInMemory } from "../../repositories/NoteRepositoryInMemory";
import { GetAllNotesUseCase } from "./getAllNotesUseCase";

let getAllNotesUseCase : GetAllNotesUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Get all notes', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory();
        getAllNotesUseCase = new GetAllNotesUseCase(noteRepositoryInMemory);
    });

    it('Should be able to get all notes', async() => {
        const note = makeNote();

        noteRepositoryInMemory.notes = [note];

        const notes = await getAllNotesUseCase.execute();

        expect(notes).toEqual([note]);
    });

    it('Should be able to return an empty array if there are no notes', async() => {
        const note = makeNote();

        noteRepositoryInMemory.notes = [note];

        const notes = await getAllNotesUseCase.execute();

        expect(notes).toEqual([]);
    })
})