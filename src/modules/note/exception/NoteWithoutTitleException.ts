import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class NoteWithoutTitleException extends AppException {
  constructor() {
    super({
      message: 'A nota precisa de um título',
      status: HttpStatus.CONFLICT,
    });
  }
}
