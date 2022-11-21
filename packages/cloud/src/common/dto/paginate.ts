import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, Min } from 'class-validator'

export class BasePaginate {
  @ApiProperty({
    description: '分页，默认为0',
    example: 0
  })
  @Type(() => Number)
  @IsInt({ message: '参数page要求是整数!' })
  @Min(1, { message: '参数page最小值是1' })
  page?: number

  @ApiProperty({
    description: '每一页显示多少条数据，默认为10',
    example: 10
  })
  @Type(() => Number)
  @IsInt({ message: '参数pageSize要求是整数!' })
  @Min(10, { message: '参数pageSize的值从1开始' })
  pageSize?: number
}
