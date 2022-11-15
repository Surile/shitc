import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @IsString({ message: '必须为string' })
  @IsNotEmpty({ message: 'open_id为空' })
  @ApiProperty({
    description: '用户open_id'
  })
  open_id: string
}
