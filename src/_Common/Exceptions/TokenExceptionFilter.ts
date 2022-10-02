import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { EnvConstants } from '../Constants/EnvConstants';

interface IOptions {
  clearAccessCookie?: boolean,
  clearRefreshCookie?: boolean,
}

@Catch(HttpException)
export class TokenExceptionFilter implements ExceptionFilter {
  constructor(private readonly options?: IOptions) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (this.options?.clearAccessCookie) response.clearCookie(EnvConstants.JWT_ACCESS_COOKIE);
    if (this.options?.clearRefreshCookie) response.clearCookie(EnvConstants.JWT_REFRESH_COOKIE);
  }
}