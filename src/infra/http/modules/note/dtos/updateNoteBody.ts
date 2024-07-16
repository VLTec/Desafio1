import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";

export class UpdateNoteBody {

    @IsStringCustom()
    @IsNotEmptyCustom()
    @ApiProperty()
    title: string;
    
    @IsStringCustom()
    @ApiProperty()
    description: string;
}