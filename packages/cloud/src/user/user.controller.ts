import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
  Get,
  Request,
  HttpCode
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation } from '@nestjs/swagger'
import { UserService } from './user.service'

@Controller()
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @ApiOperation({
    summary: '获取用户详情'
  })
  async fetchUser(@Request() req) {
    return await this.userService.fetchUser(req.user.id)
  }

  @Post('update_user_avatar')
  @ApiOperation({
    summary: '更新用户头像'
  })
  async updateAvatar(@Request() req, @Body() url: string) {
    if (!url) throw new HttpException('url不能为空', HttpStatus.BAD_REQUEST)
    return await this.userService.updateAvatar({ id: req.user.id, url })
  }

  @ApiOperation({
    summary: '更新用户手机号'
  })
  @Post('update_user_phone')
  async updatePhone(@Body() body: { phone: string }, @Request() req) {
    if (!body.phone) throw new HttpException('参数不能为空', HttpStatus.BAD_REQUEST)
    return await this.userService.updateUser({
      id: req.user.id,
      ...body
    })
  }

  @ApiOperation({
    summary: '更新用户位置'
  })
  @HttpCode(HttpStatus.OK)
  @Post('update_user_location')
  async updateLocation(@Body() body: { longitude: number; latitude: number }, @Request() req) {
    if (!body.latitude || !body.longitude)
      throw new HttpException('参数不能为空', HttpStatus.BAD_REQUEST)
    return await this.userService.updateLocation({ id: req.user.id, ...body })
  }
}
