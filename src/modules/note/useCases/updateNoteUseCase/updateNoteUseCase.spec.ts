import { NoteRepositoryInMemory } from "../../repositories/NoteRepositoryInMemory";
import { UpdateNoteUseCase } from "./updateNoteUseCase";
import { makeNote } from "../../factories/noteFactory";

let updateNoteUseCase : UpdateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Update note', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory();
        updateNoteUseCase = new UpdateNoteUseCase(noteRepositoryInMemory);
    });

    it('Should be able to update note', async() => {
        expect(noteRepositoryInMemory.notes).toEqual([]);

        const note = await updateNoteUseCase.execute({    
            title: "Nota 3",
            description: "Descrição da Nota 3",
            id: "4fa000ls-z669-01lk-1112-581abc20wjkl", // random uuid
            userId: "414111ls-z669-0alk-1112-anfabc20wjkl" // random uuid
        });

        expect(noteRepositoryInMemory.notes).toEqual([note]);
    });

    it('Should be able to update note without title', async() => {
        const note = makeNote();

        noteRepositoryInMemory.notes = [note]; 

        const updateNote = await updateNoteUseCase.execute({
            description: "Descrição da Nota 2",
            id: "4faabkls-z669-052k-0312-5814g2000010", // random uuid
            userId: "214111ls-z669-0alk-1112-anfabc20wjkl" // random uuid
        });

        
        expect(updateNote.title).toEqual(note.title);
    });

    it('Should be able to update note without description', async() => {
        const note = makeNote();

        noteRepositoryInMemory.notes = [note];

       
        const updateNote = await updateNoteUseCase.execute({
            title: "Nota 4",
            id: "4faabkls-z123-052k-0312-lll4g2000000", // random uuid
            userId: "214111ls-z669-0alk-abcd-anfabc20wjkl" // random uuid
        })
        
        expect(updateNote.description).toEqual(note.description);
    })
})