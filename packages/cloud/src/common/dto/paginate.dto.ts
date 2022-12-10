import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { BasePaginate } from './paginate'

export class PaginateOptionalDto extends BasePaginate {
  @ApiProperty({
    description: '文章标题',
    example: '文章标题'
  })
  @IsOptional()
  @IsString({ message: 'title必须为字符串' })
  title?: string

  @ApiProperty({
    description: '文章状态',
    example: 1
  })
  @IsOptional()
  @IsString({ message: 'status必须为number' })
  status?: number

  @ApiProperty({
    description: '文章id',
    example: '1, 2, 3, 4'
  })
  @IsOptional()
  ids?: string

  @IsOptional()
  latitude?: string

  @IsOptional()
  longitude?: string
}
