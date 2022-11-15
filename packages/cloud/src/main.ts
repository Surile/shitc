import helmet from 'helmet'
import * as compression from 'compression'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TimeoutInterceptor, TransformInterceptor } from './common/interceptors'
import { HttpExceptionFilter } from './common/filters'
import { ConfigService } from '@nestjs/config'

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

  // 超时
  app.useGlobalInterceptors(new TimeoutInterceptor())

  // 统一返回数据
  app.useGlobalInterceptors(new TransformInterceptor())

  // 异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  // 全局守卫
  const configService = app.get(ConfigService)

  await app.listen(3000)
}

void bootstrap().then(() => {
  console.log('App listen on http://localhost:3000')
})
