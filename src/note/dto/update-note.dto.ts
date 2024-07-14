import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';
import { IsString } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @ApiProperty()
  @IsString()
  id: string;
}
