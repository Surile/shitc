import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiOperation } from '@nestjs/swagger'
import { LoginDto } from 'src/common/dto'

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: '小程序登录'
  })
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body)
  }
}
