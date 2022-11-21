import { Injectable, NestMiddleware } from '@nestjs/common'
import type { Request, Response } from 'express'
import { PinoLogger } from 'nestjs-pino'

@Injectable()
export class LoggerContextMiddleward implements NestMiddleware {
  constructor(private readonly logger: PinoLogger) {}

  public use(req: Request, res: Response, next: () => void) {
    const logFormat = `
            Request original url: ${req.originalUrl}
            Method: ${req.method}
            User: ${JSON.stringify(req.headers.user_id)}
            Response data: ${JSON.stringify(res)}
           `

    this.logger.assign({ logFormat })

    return next()
  }
}
