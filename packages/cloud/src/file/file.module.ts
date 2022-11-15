import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Photo } from 'src/common/entity/photo.entity'
import { Shop } from 'src/common/entity'
import { ShareModule } from 'src/shared/shared.module'

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Shop]), ShareModule],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}
