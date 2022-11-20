import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Cos from 'cos-nodejs-sdk-v5'

@Injectable()
export class OssService implements OnModuleInit {
  cos: Cos

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.cos = new Cos({
      SecretId: this.configService.get('COS_BUCKET'),
      SecretKey: this.configService.get('COS_REGION')
    })
  }

  /**
   * uploadFile
   */

  async updateFile(parma: Cos.UploadFileParams) {
    try {
      const data = await this.cos.uploadFile(parma)
      return { data }
    } catch (error) {
      return { err: error, data: null }
    }
  }

  /**
   * putObject
   */

  async putObject(parma: Cos.PutObjectParams) {
    this.cos.putObject(
      {
        ...parma
      },
      function (err, data) {
        console.log(err || data)
      }
    )
  }
}
