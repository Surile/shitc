import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AddShopDto } from 'src/common/dto/shop/add.dto'
import { PaginateOptionalDto } from 'src/common/dto/paginate.dto'
import { User } from 'src/common/entity'
import { ShopService } from './shop.service'
import { UpdateShop } from 'src/common/dto'
import { ApiOperation } from '@nestjs/swagger'
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('shops')
  @ApiOperation({
    summary: '查询商品列表'
  })
  async getShops(@Query() query: PaginateOptionalDto) {
    return await this.shopService.getShops(query)
  }

  @Post('shop')
  @ApiOperation({
    summary: '创建商品'
  })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('files'))
  async createShop(
    @Body() body: AddShopDto,
    @Req() request: Request & { user: User },
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return await this.shopService.addShop({
      ...body,
      user_id: request.user.id,
      files
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
}
