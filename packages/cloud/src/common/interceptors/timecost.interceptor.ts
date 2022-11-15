import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'

@Injectable()
export class TimeCost implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now()
    return next.handle().pipe(tap(() => console.log(`Time:${Date.now() - start}ms\n`)))
  }
}
