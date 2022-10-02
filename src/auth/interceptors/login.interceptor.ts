import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000/';
    return next.handle().pipe(
      map((data: any) => ({
        success: true,
        status: context.switchToHttp().getResponse().statusCode,
        data: data,
        error: null,
      }))
    );
  }
}