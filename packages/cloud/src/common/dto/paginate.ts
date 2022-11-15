import { ApiProperty } from '@nestjs/swagger'

export class PaginateDto {
  @ApiProperty({
    description: '分页，默认为0',
    example: 0
  })
  page?: number

  @ApiProperty({
    description: '每一页显示多少条数据，默认为10',
    example: 10
  })
  pageSize?: number

  //   @ApiProperty({
  //     description: '文章标题',
  //     example: '文章标题'
  //   })
  title?: string
}
