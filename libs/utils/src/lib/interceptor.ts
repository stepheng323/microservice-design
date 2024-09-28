import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('Logger');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url } = request;
    const startTime = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          const { statusCode } = response;
          const endTime = Date.now();
          const elapsedTime = endTime - startTime;
          this.logger.log(`${method} ${url} ${statusCode} - ${elapsedTime}ms`);
        },
      ))
  }
}
