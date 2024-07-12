import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { MeilerModule } from 'src/modules/meiler/meiler.module';

import { CreateNoteUseCase } from 'src/modules/notes/useCases/createNoteUseCase/createNoteUseCase';
import { GetAllNoteUseCase } from 'src/modules/notes/useCases/getAllNoteUseCase/getAllNoteUseCase';
import { GetNoteByIdUseCase } from 'src/modules/notes/useCases/getNoteByIdUseCase/getNoteByIdUseCase';
import { UpdateNoteUseCase } from 'src/modules/notes/useCases/updateNoteUseCase/updateNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/notes/useCases/deleteNoteUseCase/deleteNoteUseCase';

@Module({
  imports: [DatabaseModule, MeilerModule],
  controllers: [NotesController],
  providers: [
    CreateNoteUseCase,
    GetAllNoteUseCase,
    GetNoteByIdUseCase,
    UpdateNoteUseCase,
    DeleteNoteUseCase,
  ],
})
export class NotesModule {}
