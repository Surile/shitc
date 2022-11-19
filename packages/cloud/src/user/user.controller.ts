import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseGuards,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from 'src/common/dto'
import { UserService } from './user.service'

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: LoginDto) {
    return await this.userService.createUser(body)
  }

  @Put(':id')
  async updatePhone(@Param('id') id: number, @Body() body: any) {
    if (!Object.keys(body).length) throw new HttpException('参数不能为空', HttpStatus.BAD_REQUEST)
    return await this.userService.updateUser({
      id,
      ...body
    })
  }
}
