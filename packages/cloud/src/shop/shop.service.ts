import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AddShopDto } from 'src/common/dto/shop/add.dto'
import { PaginateOptionalDto } from 'src/common/dto/paginate.dto'
import { Shop, Tag, User } from 'src/common/entity'
import { Repository } from 'typeorm'
import { UpdateShop } from 'src/common/dto'
import { Photo } from 'src/common/entity/photo.entity'
import * as geohash from 'geohash'

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
    page = 1,
    pageSize = 10,
    title,
    status = 1,
    ids,
    latitude,
    longitude
  }: Omit<PaginateOptionalDto, 'ids'> & { ids: number[] }): Promise<{
    total: number
    list: Shop[]
  }> {
    const db = await this.shopRepository
      .createQueryBuilder('shop')
      .leftJoinAndSelect('shop.photos', 'photo')
      .leftJoinAndSelect('shop.user', 'user')
      .where('shop.status LIKE :status ', {
        status: '%' + status + '%'
      })
      .skip((page - 1) * pageSize)
      .take(pageSize)
    if (title) {
      db.where('shop.title LIKE :title', { title: '%' + title + '%' })
    }
    if (latitude && longitude) {
      db.where('shop.geo_code LIKE :geo_code', {
        geo_code: geohash.GeoHash.encodeGeoHash(longitude, latitude).substring(0, 5) + '%'
      })
    }
    if (ids.length) {
      db.where('shop.id IN (:...ids)', { ids })
    }
    const [list, total] = await db.getManyAndCount()
    return {
      total,
      list
    }
  }

  async addShop(data: AddShopDto & { user_id: number }): Promise<{ id: number }> {
    try {
      const { user_id: id, img_urls, ...shopData } = data
      const shop = await this.shopRepository.create({
        ...shopData,
        geo_code: geohash.GeoHash.encodeGeoHash(shopData.longitude, shopData.latitude)
      })
      const filenames = img_urls.map((item) => ({ url: item }))
      const res = await this.shopRepository.save(shop)
      const photos = await this.photoRepository
        .createQueryBuilder()
        .insert()
        .values(filenames)
        .execute()
      await this.shopRepository.createQueryBuilder().relation('user').of(shop).set(id)
      await this.shopRepository
        .createQueryBuilder()
        .relation('photos')
        .of(shop)
        .add(photos.identifiers)
      return {
        id: res.id
      }
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

  async getShop(id: number) {
    return await this.shopRepository.findOne({
      where: { id },
      relations: ['user', 'photos', 'tags']
    })
  }
}
