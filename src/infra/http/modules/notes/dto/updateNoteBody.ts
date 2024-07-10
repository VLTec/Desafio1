import { PartialType } from '@nestjs/swagger';
import { CreateNoteBody } from './createNoteBody';

export class UpdateNoteBody extends PartialType(CreateNoteBody) {}
