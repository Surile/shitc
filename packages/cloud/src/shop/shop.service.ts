import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AddShopDto } from 'src/common/dto/shop/add.dto'
import { PaginateOptionalDto } from 'src/common/dto/paginate.dto'
import { Shop, Tag, User } from 'src/common/entity'
import { Repository } from 'typeorm'
import { UpdateShop } from 'src/common/dto'
import { Photo } from 'src/common/entity/photo.entity'

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>
  ) {}

  async getShops({
    page,
    pageSize,
    title
  }: PaginateOptionalDto): Promise<{ total: number; list: Shop[] }> {
    const [list, total] = await this.shopRepository.findAndCount({
      relations: ['photos'],
      where: title ? { title } : {},
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return {
      total,
      list
    }
  }

  async addShop(data: AddShopDto & { user_id: number }): Promise<string> {
    try {
      const { user_id: id, files, ...shopData } = data
      const filepaths = files.map((file) => ({
        url: file.path
      }))
      const shop = await this.shopRepository.create(shopData)
      await this.shopRepository.save(shop)
      const photos = await this.photoRepository
        .createQueryBuilder()
        .insert()
        .values(filepaths)
        .execute()
      await this.shopRepository.createQueryBuilder().relation('user').of(shop).set(id)
      await this.shopRepository
        .createQueryBuilder()
        .relation('photos')
        .of(shop)
        .add(photos.identifiers)
      return '提交成功'
    } catch (error) {
      console.log('error', error)
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
