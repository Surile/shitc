import * as nuid from 'nuid'
import * as dayjs from 'dayjs'
import { diskStorage } from 'multer'
import { BadRequestException, Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { Shop, Tag, User } from 'src/common/entity'
import { Photo } from 'src/common/entity/photo.entity'
import { ShopController } from './shop.controller'
import { ShopService } from './shop.service'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop, Tag, User, Photo]),
    MulterModule.register({
      storage: diskStorage({
        destination: `./public/uploads/${dayjs().format('YYYY-MM-DD')}`,
        filename: (req, file, cb) => {
          const mimetypes = ['image/png', 'image/jpg', 'image/jpeg']
          const allowed = mimetypes.some((type) => type === file.mimetype)
          const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`
          if (allowed) {
            cb(null, filename)
          } else {
            cb(new BadRequestException('不支持上传此类型文件'), filename)
          }
        }
      })
    }),
    UserModule
  ],
  controllers: [ShopController],
  providers: [ShopService, JwtStrategy]
})
export class ShopModule {}
