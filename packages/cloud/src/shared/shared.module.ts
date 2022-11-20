import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { OssService } from './oss/oss.service'

@Module({
  imports: [ConfigModule],
  exports: [OssService],
  providers: [OssService]
})
export class ShareModule {}
