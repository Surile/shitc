import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { WeChatService } from 'nest-wechat'
import { LoginDto } from 'src/common/dto'
import { User } from 'src/common/entity'
import { Repository } from 'typeorm'

type AuthData = { user: User; access_token: string }

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly wechatService: WeChatService
  ) {}

  async login({ js_code }: LoginDto): Promise<AuthData> {
    const res = await this.wechatService.mp.code2Session(js_code)
    if (!res.openid) throw new HttpException(res.errmsg, HttpStatus.BAD_REQUEST)
    const user = await this.userRepository.findOne({ where: { open_id: res.openid } })
    if (!user) {
      const data = await this.userRepository.create({ open_id: res.openid })
      const createUserData = await this.userRepository.save(data)
      const { open_id: _, phone, shops, ...payload } = createUserData
      return {
        user: createUserData,
        access_token: this.jwtService.sign(payload)
      }
    }
    const { open_id: _, phone, shops, ...payload } = user
    return {
      user,
      access_token: this.jwtService.sign(payload)
    }
  }
}
