import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class AddShopDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @ApiProperty({ description: '文章标题', example: '标题' })
  title: string

  @IsNotEmpty({ message: '内容不能为空' })
  @ApiProperty({ description: '文章内容', example: '内容' })
  content: string

  @ApiProperty({ description: '图片内容' })
  @IsNotEmpty({ message: 'img_urls不能为空' })
  img_urls: string[]
}
