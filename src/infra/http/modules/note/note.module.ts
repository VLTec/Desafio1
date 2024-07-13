import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { NoteController } from './note.controller';
import { NoteUseCase } from 'src/modules/note/useCase/noteUseCase';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [NoteUseCase, MailService],
})
export class NoteModule {}
