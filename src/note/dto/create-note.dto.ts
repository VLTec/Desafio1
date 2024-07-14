import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(500)
  description: string | null;

  @ApiProperty()
  @IsString()
  userId: string;
}
