import { Injectable, OnModuleInit } from '@nestjs/common'
import * as Cos from 'cos-nodejs-sdk-v5'

@Injectable()
export class OssService implements OnModuleInit {
  cos: Cos

  onModuleInit() {
    this.cos = new Cos({
      SecretId: 'AKIDZ0MbjiWMAWnvva3ILGxuqeFfu7ISXdhh',
      SecretKey: 'zvMceQDxiszwZ2YzCOiy2zjLm3CLMFZl'
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
