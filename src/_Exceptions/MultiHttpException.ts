import { HttpException } from '@nestjs/common';

export class MultiHttpException extends HttpException {
  constructor(messagesObj, status) {
    const response = {
      success: false,
      status: status,
      error: {
        type: 'multi-message',
        messages: messagesObj,
      },
      data: null,
    }
    super(response, status);
  }
}