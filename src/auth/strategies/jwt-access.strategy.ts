import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Request } from 'express';
import { JWTPayload } from '../types/tokens';
import { EnvConstants } from '../../_Common/Constants/EnvConstants';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy,'jwt-access') {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: EnvConstants.JWT_ACCESS_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JWTPayload, done: VerifiedCallback) {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this.userService.findById(payload.id);
    if (!token) done('Ошибка access аутентификации - невалидный токен', null);
    if (!user) done('Ошибка access аутентификации - пользователь не существует', null);
    done(null, {user, token: token, roles: payload.roles});
  }
}