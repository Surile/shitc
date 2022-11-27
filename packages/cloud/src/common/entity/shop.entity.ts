import {
  RelationId,
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BeforeUpdate
} from 'typeorm'
import { Photo } from './photo.entity'
import { Tag } from './tag.entity'
import { User } from './user.entity'

export type ShopStatus = 0 | 1 | 2

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn({ comment: '商品id' })
  id: number

  @ManyToOne(() => User, (user) => user.shops, {
    onDelete: 'NO ACTION'
  })
  @JoinColumn({ name: 'user_id' })
  user: User

  @RelationId((shop: Shop) => shop.user)
  user_id: number

  @Column('varchar', { comment: '商品名称' })
  title: string

  @Column('varchar', { comment: '商品内容' })
  content: string

  @Column({ type: 'enum', comment: '商品状态 0在售 1已售 2删除', default: 1, enum: [0, 1, 2] })
  status: ShopStatus

  @ManyToMany(() => Tag, (tag) => tag.shops)
  @JoinTable({
    name: 'shop_tags',
    joinColumn: {
      name: 'shop_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id'
    }
  })
  tags: Tag[]

  @ManyToMany(() => Photo, (photo) => photo.Shop)
  @JoinTable({
    name: 'shop_photos',
    joinColumn: {
      name: 'shop_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'photo_id',
      referencedColumnName: 'id'
    }
  })
  photos: Photo[]

  @Column()
  old_price: number

  @Column({ srid: 0, comment: '南纬' })
  latitude: string

  @Column({ srid: 0, comment: '北纬' })
  longitude: string

  @Column('int', { comment: '价格' })
  price: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间' })
  create_time: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '更新时间' })
  update_time: Date

  @BeforeUpdate()
  updateTimestamp() {
    this.update_time = new Date()
  }
}
