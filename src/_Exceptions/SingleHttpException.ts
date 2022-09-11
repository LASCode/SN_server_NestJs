import { HttpException } from '@nestjs/common';

export class SingleHttpException extends HttpException {
  constructor(message, status) {
    const response = {
      success: false,
      status: status,
      error: {
        type: 'single-message',
        message: message
      },
      data: null,
    }
    super(response, status);
  }
}