import helmet from 'helmet'
import * as express from 'express'
import * as compression from 'compression'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TimeoutInterceptor, TransformInterceptor } from './common/interceptors'
import { HttpExceptionFilter } from './common/filters'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 接口文档
  const config = new DocumentBuilder()
    .setTitle('社区二手交易')
    .setDescription('接口文档')
    .setVersion('1.0.0')
    .addTag('shitc')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/api', app, document)

  // 防止跨站攻击
  app.use(helmet())

  // 开启gzip压缩
  app.use(compression())

  // 参数校验
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false
    })
  )

  app.use('/public', express.static(join(__dirname, '..', 'public')))

  // 超时
  app.useGlobalInterceptors(new TimeoutInterceptor())

  // 统一返回数据
  app.useGlobalInterceptors(new TransformInterceptor())

  // 异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  const port = app.get(ConfigService).get('port')

  await app.listen(port, () => {
    console.log(`App listen on http://localhost:${port}`)
  })
}

void bootstrap()
