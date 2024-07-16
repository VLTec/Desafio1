import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { GetNotesUseCase } from 'src/modules/note/useCases/getNotesUseCase/getNotesUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { UpdateNoteUseCase } from 'src/modules/note/useCases/updateNoteUseCase/updateNoteUseCase';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
  ],
  controllers: [NoteController],
  providers: [
    CreateNoteUseCase,
    GetNoteUseCase,
    GetNotesUseCase,
    UpdateNoteUseCase,
    DeleteNoteUseCase
  ]
})
export class NoteModule {}
