import { ApiProperty } from '@nestjs/swagger';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';

export class CreateNoteBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  @ApiProperty()
  title: string;

  @IsStringCustom()
  @ApiProperty()
  description: string;
}
