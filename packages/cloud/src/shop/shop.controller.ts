import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AddShopDto } from 'src/common/dto/shop/add.dto'
import { PaginateOptionalDto } from 'src/common/dto/paginate.dto'
import { User } from 'src/common/entity'
import { ShopService } from './shop.service'
import { ShopDto, UpdateShop } from 'src/common/dto'
import { ApiOperation } from '@nestjs/swagger'

@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('shops')
  @ApiOperation({
    summary: '查询商品列表'
  })
  async getShops(@Query() query: PaginateOptionalDto) {
    const ids = query.ids ? query.ids.split(',').map((item) => Number(item)) : []
    return await this.shopService.getShops({ ...query, ids })
  }

  @Post('shop')
  @ApiOperation({
    summary: '创建商品'
  })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async createShop(@Body() body: AddShopDto, @Req() request: Request & { user: User }) {
    return await this.shopService.addShop({
      ...body,
      user_id: request.user.id
    })
  }

  @Post('update_shop/:id')
  @ApiOperation({
    summary: '更新商品信息'
  })
  @UseGuards(AuthGuard('jwt'))
  async updateShop(@Body() body: UpdateShop, @Param() query: { id: UpdateShop['id'] }) {
    console.log('query', query)
    return await this.shopService.updateShopStatus({
      id: query.id,
      ...body
    })
  }

  @Get('shop/:id')
  @ApiOperation({
    summary: '查询商品详情'
  })
  async getShop(@Param() param: ShopDto) {
    return this.shopService.getShop(param.id)
  }
}
