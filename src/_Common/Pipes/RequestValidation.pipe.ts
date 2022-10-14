import { ArgumentMetadata, HttpStatus, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CustomHttpException } from '../Exceptions/CustomHttpException';

export class RequestValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (typeof value === 'object') {
      const obj = plainToInstance(metadata.metatype, value);
      const errors = await validate(obj);
      if (errors.length) {
        const result = errors.reduce((acc, curr) => {
          const { property, constraints } = curr;
          // Выдача первой в списке ошибки поля - возвращает [key: fieldName]: string;
          acc[property] = Object.values(constraints).reverse()[0];
          // Выдача всего массива ошибок поля - возвращает [key: fieldName]: string[];
          // acc[property] = Object.values(constraints).reverse();
          return acc;
        }, {})
        throw new CustomHttpException(result, HttpStatus.BAD_REQUEST);
      }
    }
    return value;
  }
}