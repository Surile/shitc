import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, RelationId } from 'typeorm'
import { Shop } from './shop.entity'

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn({ comment: '标签id' })
  id: number

  @Column({ comment: '标签名称' })
  name: string

  @ManyToMany(() => Shop)
  shops: Shop[]

  @RelationId((tag: Tag) => tag.shops) // 需要指定目标关系
  shop_ids: number[]
}
