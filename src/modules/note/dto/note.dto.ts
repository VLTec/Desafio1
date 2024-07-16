import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class NoteDto extends BaseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @MaxLength(500)
  description?: string;
}
