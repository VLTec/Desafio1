import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom'
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteBody {
    @ApiProperty()
    title?: string;

    @ApiProperty()
    description?: string;

    @IsStringCustom()
    @IsNotEmptyCustom()
    @ApiProperty()
    userId: string;
}