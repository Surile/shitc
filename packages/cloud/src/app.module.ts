import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoggerModule } from 'nestjs-pino'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configuration, databaseConfig } from './config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ShopModule } from './shop/shop.module'
import { WeChatModule } from 'nest-wechat'

interface DatabaseConfig {
  host: string
  port: number
  password: string
  database: string
  entities: string[]
  username: string
  synchronize?: boolean
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfig>('database')
        return {
          type: 'mysql',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          entities: dbConfig.entities,
          database: dbConfig.database,
          synchronize: true,
          logging: true
        }
      },
      inject: [ConfigService]
    }),
    LoggerModule.forRoot(),
    AuthModule,
    UserModule,
    ShopModule,
    WeChatModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        appId: configService.get('WX_APPID'),
        secret: configService.get('WX_SECRET')
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
