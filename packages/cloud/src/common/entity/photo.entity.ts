import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Shop } from './shop.entity'

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '图片地址' })
  url: string

  @ManyToOne(() => Shop, (shop) => shop.photos)
  Shop: Shop
}
