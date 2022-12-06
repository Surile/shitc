import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { User } from 'src/common/entity/user.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { ShareModule } from './../shared/shared.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule, ShareModule],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
