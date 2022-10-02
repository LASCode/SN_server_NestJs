import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { ProfileRes } from '../dto/profile.res';

@Injectable()
export class ProfileOwnerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => ({
        success: true,
        status: context.switchToHttp().getResponse().statusCode,
        data: plainToInstance(ProfileRes, data, { excludeExtraneousValues: true }),
        error: null,
      }))
    );
  }
}