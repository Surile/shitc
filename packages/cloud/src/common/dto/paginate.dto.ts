import { ApiProperty } from '@nestjs/swagger'
import { BasePaginate } from './paginate'

export class PaginateOptionalDto extends BasePaginate {
  @ApiProperty({
    description: '文章标题',
    example: '文章标题'
  })
  title?: string

  status?: number
}
