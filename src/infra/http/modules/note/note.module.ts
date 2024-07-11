import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateNoteUseCase } from '@modules/notes/useCases/createNoteUseCase/createNoteUseCase';
import { GetNoteByIdUseCase } from '@/modules/notes/useCases/getNoteByIdUseCase/getNoteByIdUseCase';
import { GetAllUserNotesUseCase } from '@/modules/notes/useCases/getAllUserNotesUseCase/getAllUserNotesUseCase';
import { MailService } from '@/modules/mail/services/mailService';
import { RemoveNoteByIdUseCase } from '@/modules/notes/useCases/removeNoteByIdUseCase/removeNoteByIdUseCase';
import { UpdateNoteUseCase } from '@/modules/notes/useCases/updateNoteUseCase/updateNoteUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [
    //useCases
    CreateNoteUseCase,
    GetNoteByIdUseCase,
    GetAllUserNotesUseCase,
    RemoveNoteByIdUseCase,
    UpdateNoteUseCase,

    //mail
    MailService,
  ],
})
export class NoteModule {}
