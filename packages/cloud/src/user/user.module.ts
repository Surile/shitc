import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { User } from 'src/common/entity/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
