import { IsNotEmpty, IsIn, IsString } from 'class-validator'

export class UpdateShop {
  @IsNotEmpty({ message: '商品id不能为空' })
  id: number

  @IsIn([0, 1, 2], { message: 'status不正确' })
  status?: 0 | 1 | 2

  @IsString({ message: '标题必须为string' })
  title?: string

  @IsString({ message: '内容必须为string' })
  content?: string
}
