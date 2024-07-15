import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class findByIdNoteParams {
  @IsStringCustom()
  @IsNotEmptyCustom()
  @ApiProperty()
  id: string;
}
