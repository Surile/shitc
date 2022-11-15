import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/common/entity'
import { Repository } from 'typeorm'

type AuthData = { user: User; access_token: string }

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async login({ open_id, union_id }: { open_id: string; union_id?: string }): Promise<AuthData> {
    const user = await this.userRepository.findOne({ where: { open_id } })
    if (!user) {
      const data = await this.userRepository.create({ open_id, union_id })
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

  async validateUser(open_id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { open_id } })
    if (user && user.open_id === open_id) {
      return user
    }
    return null
  }
}
