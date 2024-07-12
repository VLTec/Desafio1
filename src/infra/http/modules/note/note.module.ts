import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/createNoteUseCase'; // Ajuste o caminho conforme necessário
import { GetNotesUseCase } from 'src/modules/note/useCases/createUserUseCase/getAllNoteUseCase';// Ajuste o caminho conforme necessário
import { DatabaseModule } from 'src/infra/database/database.module';
import { GetNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/getNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/deleteNoteUseCase';
import { UpdateNoteUseCase } from 'src/modules/note/useCases/createUserUseCase/updateNoteUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [CreateNoteUseCase, GetNotesUseCase, GetNoteUseCase, DeleteNoteUseCase,UpdateNoteUseCase],
})
export class NoteModule {}
