import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class NoteNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Usuário não encontrado',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
