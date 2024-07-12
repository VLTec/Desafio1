import { NoteRepositoryInMemory } from "../../repositories/NoteRepositoryInMemory";
import { CreateNoteUseCase } from "./createNoteUseCase";
import { makeNote } from "../../factories/noteFactory";
import { NoteWithoutTitleException } from "../../exceptions/NoteWithoutTitle";

let createNoteUseCase : CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Create note', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory();
        createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
    });

    it('Should be able to create note', async() => {
        expect(noteRepositoryInMemory.notes).toEqual([]);

        const note = await createNoteUseCase.execute({    
            title: "Nota 2",
            description: "Descrição da Nota 2",
            userId: "4fa521ls-z669-052k-0312-5814g20w4260" // random uuid
        });

        expect(noteRepositoryInMemory.notes).toEqual([note]);
    });

    it('Should be able to create note without description', async() => {
        expect(noteRepositoryInMemory.notes).toEqual([]);

        const note = await createNoteUseCase.execute({
            title: "Nota 3",
            userId: "414000ls-z669-01lk-1112-anfabc20wjkl" // random uuid
        });

        expect(noteRepositoryInMemory.notes).toEqual([note]);
    })

    it('Should be able to throw error when create note without title', async() => {
        const note = makeNote();

        noteRepositoryInMemory.notes = [note]; 

        expect(
            async () => await createNoteUseCase.execute({
                title: "",
                description: "Descrição da Nota 2",
                userId: "4fa521ls-z669-052k-0312-5814g20w4h10" // random uuid
            }),
        ).rejects.toThrow(NoteWithoutTitleException);
    })
})