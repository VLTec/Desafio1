import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { NoteController } from './note.controller';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { FindAllNotesUseCase } from 'src/modules/note/useCases/findAllNotesUseCase/findAllNotesUseCase';
import { FindByIdNoteUseCase } from 'src/modules/note/useCases/findByIdNoteUseCase/findByIdNoteUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [CreateNoteUseCase, FindAllNotesUseCase, FindByIdNoteUseCase],
})
export class NoteModule {}
