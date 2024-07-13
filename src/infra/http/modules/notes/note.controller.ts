import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { UpdateNoteUseCase } from 'src/modules/note/useCases/updateNoteUseCase/updateNoteUseCase';
import { NotesController } from './note.module';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { GetAllNotesUseCase } from 'src/modules/note/useCases/getAllNotesUseCase/getAllNotesUseCase';
import { MailtrapEmailService } from 'src/modules/email/emailTrapEmailService';

@Module({
  imports: [DatabaseModule, MailtrapEmailService],
  controllers: [NotesController],
  providers: [
    GetNoteUseCase,
    GetAllNotesUseCase,
    UpdateNoteUseCase,
    CreateNoteUseCase,
    DeleteNoteUseCase,
  ],
})
export class NotesModule {}
