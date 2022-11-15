import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt.guard'
import { LoginDto } from 'src/common/dto'
import { UserService } from './user.service'

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: LoginDto) {
    return await this.userService.createUser(body)
  }

  @Get()
  async getUsers() {
    return await this.userService.getUsers()
  }

  @Put(':id')
  async updatePhone(@Param('id') id: number) {
    return await this.userService.updateUserPhone(id)
  }
}
