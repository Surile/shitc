import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { Shop, Tag, User } from 'src/common/entity'
import { Photo } from 'src/common/entity/photo.entity'
import { ShopController } from './shop.controller'
import { ShopService } from './shop.service'
import { UserModule } from 'src/user/user.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([Shop, Tag, User, Photo]), UserModule],
  controllers: [ShopController],
  providers: [ShopService, JwtStrategy]
})
export class ShopModule {}
