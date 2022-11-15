import { Module } from '@nestjs/common'
import { OssService } from './oss/oss.service'

@Module({
  exports: [OssService],
  providers: [OssService]
})
export class ShareModule {}
