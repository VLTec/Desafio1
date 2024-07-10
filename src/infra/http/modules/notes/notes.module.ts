import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { CreateNoteUseCase } from 'src/modules/notes/useCases/createNoteUseCase/createNoteUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotesController],
  providers: [CreateNoteUseCase],
})
export class NotesModule {}
