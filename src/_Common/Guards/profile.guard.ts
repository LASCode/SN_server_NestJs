import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { CustomHttpException } from '../Exceptions/CustomHttpException';

@Injectable()
export class ProfileGuard implements CanActivate {

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const hasProfile = !!request?.user?.user?.profile;
    if (!hasProfile) throw new CustomHttpException('Профиль не существует', HttpStatus.BAD_REQUEST);
    return true;
  }
}