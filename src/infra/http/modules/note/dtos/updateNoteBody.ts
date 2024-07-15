import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/MinLengthCustom';

export class updateNoteBody {
  @IsOptional()
  @IsStringCustom()
  @IsNotEmptyCustom()
  @MinLengthCustom(3)
  @ApiProperty()
  title: string;

  @IsStringCustom()
  @MinLengthCustom(3)
  @IsOptional()
  @ApiProperty()
  description: string;
}
