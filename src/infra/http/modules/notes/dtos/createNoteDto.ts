import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";

export class CreateNoteBody {
  @ApiProperty()
  @IsStringCustom()
  @IsNotEmptyCustom()
  title: string;

  @ApiProperty()
  @IsStringCustom()
  description: string;
}