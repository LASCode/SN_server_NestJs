import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const responsePayload = {
      success: false,
      status: status,
      data: null,
      error: {},
    }
    switch (status) {
      case 404: responsePayload.error = {message: exception.message}; break;
      default: responsePayload.error = exception.getResponse(); break;
    }
    response.status(status).json(responsePayload)
  }
}