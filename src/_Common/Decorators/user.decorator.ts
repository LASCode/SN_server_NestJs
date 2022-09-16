import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DUser = createParamDecorator<any, any, any>(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.user;
  },
);