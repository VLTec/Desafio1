import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateNoteUseCase } from '@modules/notes/useCases/createNoteUseCase/createNoteUseCase';
import { GetNoteByIdUseCase } from '@/modules/notes/useCases/getNoteByIdUseCase/getNoteByIdUseCase';
import { GetAllUserNotesUseCase } from '@/modules/notes/useCases/getAllUserNotesUseCase/getAllUserNotesUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [CreateNoteUseCase, GetNoteByIdUseCase, GetAllUserNotesUseCase],
})
export class NoteModule {}
