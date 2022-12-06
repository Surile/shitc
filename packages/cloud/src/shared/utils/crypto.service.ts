import { Injectable } from '@nestjs/common'
import { createHash } from 'crypto'

@Injectable()
export class CryptoService {
  /**
   * 加密
   */
  encrypt(val: string) {
    return createHash('md5').update(val).digest('hex')
  }
}
