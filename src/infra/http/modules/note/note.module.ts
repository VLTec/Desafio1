import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { UpdateNoteUseCase } from 'src/modules/note/useCases/updateNoteUseCase/updateNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { NoteRepository } from 'src/modules/note/repositories/NoteRepository';
import { NoteRepositoryInMemory } from 'src/modules/note/repositories/NoteRepositoryInMemory';
import { GetNoteIdUseCase } from 'src/modules/note/useCases/getNoteIdUseCase/getNoteIdUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/UserRepositoryInMemory';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [
    CreateNoteUseCase,
    GetNoteIdUseCase,
    GetNoteUseCase,
    UpdateNoteUseCase,
    DeleteNoteUseCase,
  ],
})
export class NoteModule {}
