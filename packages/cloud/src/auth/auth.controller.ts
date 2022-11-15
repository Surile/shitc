import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common'
import { User } from 'src/common/entity'
import { AuthService } from './auth.service'
import { Request } from 'express'
import { ApiOperation } from '@nestjs/swagger'
import { LoginDto } from 'src/common/dto'

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: '小程序登录'
  })
  async login(
    @Body() body: LoginDto,
    @Req() req: Request
  ): Promise<{ user: User; access_token: string }> {
    const open_id: any = req.headers['X-WX-OPENID']
    const union_id: any = req.headers['X-WX-UNIONID']
    if (!open_id && !body.open_id) {
      throw new HttpException('open_id不能为空', HttpStatus.OK)
    }
    return await this.authService.login({
      open_id: open_id || body.open_id,
      union_id
    })
  }
}
