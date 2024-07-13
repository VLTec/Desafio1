import { Module } from "@nestjs/common";
import { NoteController } from "./note.controller";
import { CreateNoteUseCase } from "src/modules/note/useCases/createNoteUseCase/createNoteUseCase";
import { UpdateNoteUseCase } from "src/modules/note/useCases/updateNoteUseCase/updateNoteUseCase";
import { GetNoteUseCase } from "src/modules/note/useCases/getNoteUseCase/getNoteUseCase";
import { GetAllNotesUseCase } from "src/modules/note/useCases/getAllNotesUseCase/getAllNotesUseCase";
import { DeleteNoteUseCase } from "src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase";
import { DatabaseModule } from "src/infra/database/database.module";
import { MailerServices } from "../../../services/mailer.service";

@Module({
    imports: [DatabaseModule],
    controllers: [NoteController],
    providers: [
        CreateNoteUseCase,
        UpdateNoteUseCase,
        GetNoteUseCase,
        GetAllNotesUseCase,
        DeleteNoteUseCase,
        MailerServices
    ]
})

export class NoteModule {}