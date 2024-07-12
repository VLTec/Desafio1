import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class NoteWithoutTitleException extends AppException {
    constructor() {
        super({
            message: "A nota deve ter o título",
            status: HttpStatus.BAD_REQUEST
        })
    }
}