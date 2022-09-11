import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SingleHttpException } from '../_Exceptions/SingleHttpException';

@Injectable()
export class JWTAccessGuard extends AuthGuard('jwt-access') {
  handleRequest(err, user) {
    if (err || !user) {
      const error = err || 'Невалидный токен'
      throw new SingleHttpException(error, 200);
    }
    return user;
  }
}