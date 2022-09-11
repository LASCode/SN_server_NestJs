import { ArgumentMetadata, HttpStatus, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { MultiHttpException } from '../_Exceptions/MultiHttpException';

export class RequestValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);
    if (errors.length) {
      const result = errors.reduce((acc, curr) => {
        const { property, constraints } = curr;
        acc[property] = Object.values(constraints).reverse();
        return acc;
      }, {})
      throw new MultiHttpException(result, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}