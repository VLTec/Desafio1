import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class InvalidTokenFoundException extends AppException {
  constructor() {
    super({
      message: 'O Token não coincide com nenhum usuario',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
