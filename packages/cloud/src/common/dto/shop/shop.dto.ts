import { Type } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

export class ShopDto {
  @Type(() => Number)
  @IsNotEmpty({ message: '参数不能为空' })
  id: number
}
