import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { Shop, Tag, User } from 'src/common/entity'
import { ShopController } from './shop.controller'
import { ShopService } from './shop.service'

@Module({
  imports: [TypeOrmModule.forFeature([Shop, Tag, User])],
  controllers: [ShopController],
  providers: [ShopService, JwtStrategy]
})
export class ShopModule {}
