import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class EmailServiceException extends AppException {
  constructor(message: string, status?: HttpStatus) {
    super({
      message: message,
      status: status || HttpStatus.CONFLICT,
    });
  }
}
