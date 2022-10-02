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
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtAccessStrategy.extractJWT,
      ]),
      ignoreExpiration: false,
      secretOrKey: EnvConstants.JWT_ACCESS_SECRET,
      passReqToCallback: true,
    });
  }
  private static extractJWT(req: Request): string | null {
    if (req.cookies && req.cookies[EnvConstants.JWT_ACCESS_COOKIE]) {
      return req.cookies[EnvConstants.JWT_ACCESS_COOKIE]
    }
    return null;
  }
  async validate(req: Request, payload: JWTPayload, done: VerifiedCallback) {
    const refreshToken = req.cookies[EnvConstants.JWT_ACCESS_COOKIE].trim();
    const user = await this.userService.findById(payload.id);
    if (!refreshToken) done('Ошибка access аутентификации - невалидный токен', null);
    if (!user) done('Ошибка access аутентификации - пользователь не существует', null);
    done(null, {user, token: refreshToken, roles: payload.roles});
  }
}