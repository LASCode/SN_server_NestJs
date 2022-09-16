import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const reqRoles = this.reflector.getAllAndOverride('roles', [ctx.getHandler(), ctx.getClass() ]);
    if (!reqRoles) return false;
    return request.user.roles.some((role) => reqRoles.includes(role));
  }
}