import { Module } from '@nestjs/common'
import { CryptoService } from './utils/crypto.service'
@Module({
  providers: [CryptoService],
  exports: [CryptoService]
})
export class ShareModule {}
