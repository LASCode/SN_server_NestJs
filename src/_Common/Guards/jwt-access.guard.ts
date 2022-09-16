import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomHttpException } from '../Exceptions/CustomHttpException';

@Injectable()
export class JWTAccessGuard extends AuthGuard('jwt-access') {
  handleRequest(err, payload) {
    if (err || !payload) {
      throw new CustomHttpException('Невалидный токен', HttpStatus.UNAUTHORIZED);
    }
    return payload;
  }
}