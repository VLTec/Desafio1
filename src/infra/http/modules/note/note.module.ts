import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateNoteUseCase } from '@modules/notes/useCases/createNoteUseCase/createNoteUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [CreateNoteUseCase],
})
export class NoteModule {}
