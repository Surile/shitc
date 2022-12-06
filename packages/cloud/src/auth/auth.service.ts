import { lastValueFrom } from 'rxjs'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { LoginDto } from 'src/common/dto'
import { User } from 'src/common/entity'
import { Repository } from 'typeorm'

type AuthData = { access_token: string }

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async login({ js_code }: LoginDto): Promise<AuthData> {
    const res = (
      await lastValueFrom(
        this.httpService.get('/sns/jscode2session', {
          params: {
            appid: this.configService.get('WX_APPID'),
            secret: this.configService.get('WX_SECRET'),
            js_code,
            grant_type: 'authorization_code'
          }
        })
      )
    ).data
    if (!res.openid) throw new HttpException(res.errmsg, HttpStatus.BAD_REQUEST)
    const user = await this.userRepository.findOne({ where: { open_id: res.openid } })
    if (!user) {
      const data = await this.userRepository.create({ open_id: res.openid })
      const createUserData = await this.userRepository.save(data)
      const { open_id: _, phone, shops, ...payload } = createUserData
      return {
        access_token: this.jwtService.sign(payload)
      }
    }
    const { open_id: _, phone, shops, ...payload } = user
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
