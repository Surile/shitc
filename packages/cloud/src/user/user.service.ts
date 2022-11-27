import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { WeChatService } from 'nest-wechat'
import { LoginDto } from 'src/common/dto'
import { User } from 'src/common/entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly wechatService: WeChatService
  ) {}

  async fetchUser(id: number) {
    return await this.userRepository.findOne({ where: { id } })
  }

  async updateAvatar({ url, id }: { url: string; id: string }) {
    return await this.updateUser({ id, avatar_url: url })
  }

  async updatePhone({ code, id }: { code: string; id: string }) {
    const token = (await this.wechatService.getAccountAccessToken()).access_token
    const res = await this.wechatService.mp.getPhoneNumber(code, token)
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
    return await this.updateUser({ id, longitude, latitude })
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
