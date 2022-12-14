import { Observable } from 'rxjs'
import { timeout } from 'rxjs/operators'
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  timeout: number

  constructor() {
    this.timeout = 15000
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 超时处理
    return next.handle().pipe(timeout(this.timeout))
  }
}
