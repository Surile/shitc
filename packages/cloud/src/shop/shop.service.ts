import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AddShopDto } from 'src/common/dto/shop/add.dto'
import { PaginateOptionalDto } from 'src/common/dto/paginate.dto'
import { Shop, Tag, User } from 'src/common/entity'
import { Repository } from 'typeorm'
import { UpdateShop } from 'src/common/dto'

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async getShops({
    page,
    pageSize,
    title
  }: PaginateOptionalDto): Promise<{ total: number; list: Shop[] }> {
    const total = await this.shopRepository
      .createQueryBuilder('shops')
      .where('shops.title LIKE :keyword', {
        keyword: '%' + title + '%'
      })
      .getCount()
    const skip = page * pageSize ? page * pageSize : 0
    const take = page + pageSize ? Number(page) + Number(pageSize) : 10
    const shops = await this.shopRepository
      .createQueryBuilder('shops')
      .where('shops.title LIKE :keyword', {
        keyword: '%' + title + '%'
      })
      .skip(skip)
      .take(take)
      .getMany()
    return {
      total,
      list: shops
    }
  }

  async addShop(data: AddShopDto & { user_id: number }): Promise<string> {
    try {
      const { user_id: id, ...shopData } = data
      const shop = await this.shopRepository.create(shopData)
      const user = await this.userRepository.findOne({ where: { id } })
      shop.user = user
      await this.shopRepository.save(shop)
      return '提交成功'
    } catch (error) {
      throw new HttpException('提交失败', HttpStatus.OK)
    }
  }

  async updateShopStatus(data: UpdateShop): Promise<string> {
    try {
      const { id, status, content, title } = data
      const shop = await this.shopRepository.findOne({ where: { id } })
      shop.status = status
      shop.content = content
      shop.title = title
      await this.shopRepository.save(shop)
      return '更新成功'
    } catch (error) {
      return '更新失败'
    }
  }
}
