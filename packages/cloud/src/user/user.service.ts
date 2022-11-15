import { Injectable } from '@nestjs/common'
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
    const data = await this.userRepository.create(user)
    return await this.userRepository.save(data)
  }

  async getUsers() {
    const list = await this.userRepository.find()
    const total = await this.userRepository.count()
    return {
      list,
      total
    }
  }

  async updateUserPhone(id: number) {
    const data = await this.userRepository.findOne({ where: { id } })

    data.phone = '2222222'

    return await this.userRepository.save(data)
  }

  //   async updateAvatar() {}

  //   async updateLocation() {}
}
