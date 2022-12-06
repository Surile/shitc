import { CryptoService } from './../shared/utils/crypto.service'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { lastValueFrom } from 'rxjs'
import { LoginDto } from 'src/common/dto'
import { User } from 'src/common/entity'
import { Repository } from 'typeorm'
import { Cache } from 'cache-manager'

@Injectable()
export class UserService {
  wx_base_url: string
  wx_map_key: string
  wx_map_url: string
  wx_map_screen: string
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cryptoService: CryptoService
  ) {
    this.wx_map_key = this.configService.get('WX_MAP_KEY')
    this.wx_map_url = this.configService.get('WX_MAP_BASE_URL')
    this.wx_base_url = this.configService.get('WX_BASE_URL')
    this.wx_map_screen = this.configService.get('WX_MAP_SCREEN')
  }

  async fetchUser(id: number) {
    return await this.userRepository.findOne({ where: { id } })
  }

  async updateAvatar({ url, id }: { url: string; id: string }) {
    return await this.updateUser({ id, avatar_url: url })
  }

  async getAccessToken() {
    const res = await lastValueFrom(
      this.httpService.get(`${this.wx_base_url}/cgi-bin/token`, {
        params: {
          grant_type: 'client_credential',
          appid: this.configService.get('WX_APPID'),
          secret: this.configService.get('WX_SECRET')
        }
      })
    )
    const token = res.data.access_token
    const expires_in = res.data.expires_in
    const value = await this.cacheManager.get('access_token')
    if (!value) {
      await this.cacheManager.set('access_token', token, expires_in)
      return token
    }
    return value
  }

  async updatePhone({ code, id }: { code: string; id: string }) {
    const token = await this.getAccessToken()
    const res = await lastValueFrom(
      this.httpService.post(
        `${this.wx_base_url}/wxa/business/getuserphonenumber?access_token=${token}`,
        {
          code
        }
      )
    )
    return await this.updateUser({ id, photo: res.data.phone_info.phoneNumber })
  }

  async updateLocation({
    id,
    latitude,
    longitude
  }: {
    id: number
    longitude: number
    latitude: number
  }) {
    const url = `${this.wx_map_url}?key=${this.wx_map_key}&location=${latitude},${longitude}`
    const uri = new URL(url)
    const sig = this.cryptoService.encrypt(`${uri.pathname}${uri.search}${this.wx_map_screen}`)
    const res = (
      await lastValueFrom(
        this.httpService.get(this.wx_map_url, {
          params: {
            key: this.wx_map_key,
            location: `${latitude},${longitude}`,
            sig: sig
          }
        })
      )
    ).data
    if (res.status != 0) return res
    const { address, address_component } = res.result
    return await this.updateUser({ id, longitude, latitude, address, ...address_component })
  }

  async updateUser(body: any) {
    try {
      const { id, ...params } = body
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          ...params
        })
        .where('id = :id', { id })
        .execute()
      return {
        message: '更新成功'
      }
    } catch (error) {
      throw new HttpException('更新失败', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
