import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/MinLengthCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom'
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteBody {
    @IsStringCustom()
    @IsNotEmptyCustom()
    @ApiProperty()
    id: string;

    @IsStringCustom()
    @ApiProperty()
    title?: string;

    @IsStringCustom()
    @ApiProperty()
    description?: string;

    @IsStringCustom()
    @IsNotEmptyCustom()
    @ApiProperty()
    userId: string;
}