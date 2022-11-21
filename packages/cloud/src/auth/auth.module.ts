import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { jwtConstants } from './constants'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/common/entity'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' }
    })
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
