import { HttpException } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(err, status) {
    switch (typeof err) {
      case 'object': super({...err}, status); break;
      default: super({message: err}, status); break;
    }
  }
}