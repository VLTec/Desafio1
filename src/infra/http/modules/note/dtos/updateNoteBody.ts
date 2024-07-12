import { ApiProperty } from '@nestjs/swagger';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsOptional } from 'class-validator';

export class UpdateNoteBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  @ApiProperty()
  @IsOptional()
  title: string;

  @IsStringCustom()
  @ApiProperty()
  @IsOptional()
  description: string;
}
