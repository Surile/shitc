import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException) // 捕获所有异常
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('进入全局异常...')
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    // @todo 记录日志
    console.log('%s %s error: %s', request.method, request.url, exception.message)

    const exceptionResponse: any = exception.getResponse()

    const validatorMessage = exceptionResponse

    const message = exception.message
      ? validatorMessage.message || exception.message
      : status >= 500
      ? '服务端异常'
      : '客户端异常'

    const errorResponse = {
      data: { error: message },
      message: '请求失败',
      code: status // 自定义code
    }
    // 发送响应
    response.status(status).json({
      ...errorResponse
    })
  }
}
