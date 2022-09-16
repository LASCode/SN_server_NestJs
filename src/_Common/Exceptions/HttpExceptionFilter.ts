import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    // const b = typeof exception.getResponse() === 'object' ? exception.getResponse().message

    response
      .status(status)
      .json({
        success: false,
        status: status,
        data: null,
        error: exception.getResponse(),
      });
  }
}