import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AdvanceInterceptor implements NestInterceptor {
  constructor(private readonly ValidationClass) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => ({
        success: true,
        status: context.switchToHttp().getResponse().statusCode,
        data: plainToInstance(this.ValidationClass, data, { excludeExtraneousValues: true }),
        error: null,
      }))
    );
  }
}