import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({
    description: '用户code'
  })
  js_code: string
}
