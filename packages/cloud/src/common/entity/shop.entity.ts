import {
  RelationId,
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BeforeUpdate,
  OneToMany
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

  @Column({ type: 'enum', comment: '商品状态 0 下架 1上架 2删除', default: 1, enum: [0, 1, 2] })
  status: ShopStatus

  @ManyToMany(() => Tag, (tag) => tag.shops)
  @JoinTable({
    name: 'shop_tags',
    joinColumn: {
      name: 'shop',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'tag',
      referencedColumnName: 'id'
    }
  })
  tags: Tag[]

  @OneToMany(() => Photo, (photo) => photo.Shop)
  photos: Photo[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间' })
  create_time: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '更新时间' })
  update_time: Date

  @BeforeUpdate()
  updateTimestamp() {
    this.update_time = new Date()
  }
}
