import { IsNotEmpty, IsString } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, OneToMany } from 'typeorm'
import { Shop } from './shop.entity'

export type UserRole = 2 | 3 | 4 | 5 | 6

export type RegisterSource = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type UserGender = 0 | 1 | 3

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ comment: '自增id' })
  id: number

  @Column('varchar', { comment: '微信小程序' })
  @IsString({ message: 'open_id是string' })
  @IsNotEmpty({ message: 'open_id不能为空' })
  open_id: string

  @Column({
    type: 'enum',
    default: 2,
    enum: [2, 3, 4, 5, 6],
    comment: '2正常用户 3禁言用户 4虚拟用户 5运营 6封号用户'
  })
  user_role: UserRole

  @Column({
    type: 'enum',
    default: 0,
    enum: [0, 1, 2, 3, 4, 5, 6, 7],
    comment: '注册来源：0微信 1手机号 2邮箱 3用户名 4qq 5微信 6腾讯微博 7新浪微博'
  })
  register_source: RegisterSource

  @Column('varchar', { default: '微信用户', comment: '昵称' })
  nick_name: string

  @Column({ type: 'enum', default: 3, enum: [0, 1, 3], comment: '用户性别 0-女 1-男 3-未知' })
  gender: UserGender

  @Column('varchar', { nullable: true, comment: '手机号' })
  phone: string

  @Column('varchar', { nullable: true, comment: '头像' })
  avatar_url: string

  @Column({ srid: 0, comment: '南纬', nullable: true, default: 0 })
  latitude: string

  @Column({ srid: 0, comment: '北纬', nullable: true, default: 0 })
  longitude: string

  @Column({ comment: '地图描述', nullable: true })
  address: string

  @Column({ comment: '城市', nullable: true })
  city: string

  @Column({ comment: '区', nullable: true })
  district: string

  @Column({ comment: '省', nullable: true })
  province: string

  @Column({ comment: '路', nullable: true })
  street: string

  @Column({ comment: '国', nullable: true })
  nation: string

  @Column({ comment: '路', nullable: true })
  street_number: string

  @Column('varchar', { nullable: true, default: '', comment: '用于关联微信授权用户' })
  union_id: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间' })
  create_time: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '更新时间' })
  update_time: Date

  @OneToMany(() => Shop, (shop: Shop) => shop.user, {
    cascade: true
  })
  shops: Shop[]

  @BeforeUpdate()
  updateTimestamp() {
    this.update_time = new Date()
  }
}
