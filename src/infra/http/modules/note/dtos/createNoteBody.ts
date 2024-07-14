import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class createNoteBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  @ApiProperty()
  title: string;

  @IsStringCustom()
  @IsOptional()
  @ApiProperty()
  description: string;
}
