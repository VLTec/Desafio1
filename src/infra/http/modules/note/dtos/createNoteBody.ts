import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/MinLengthCustom';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  @ApiProperty()
  title: string;

  @IsStringCustom()
  @ApiProperty()
  description: string;
}
