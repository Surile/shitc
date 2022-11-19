import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LoginDto } from 'src/common/dto'
import { User } from 'src/common/entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(user: LoginDto) {
    return await this.userRepository
      .createQueryBuilder()
      .insert()
      .values({
        ...user
      })
      .execute()
  }

  async getUsers() {
    const [list, total] = await this.userRepository.findAndCount()
    return {
      list,
      total
    }
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
