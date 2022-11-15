import { Controller, Post } from '@nestjs/common'
import * as path from 'path'
import { FileService } from './file.service'
import * as fs from 'fs'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  async uploadFile() {
    const filename = '发布.png'
    const filepath = path.resolve(__dirname, filename)
    const body = fs.readFileSync(filepath)
    this.fileService.updateFile({
      Bucket: 'shitc-1254273426' /* 必须 */,
      Region: 'ap-shanghai',
      Key: filename,
      onTaskReady: function (tid) {
        console.log('TaskId', tid)
      },
      onProgress: function (progressData) {
        console.log(JSON.stringify(progressData))
      },
      Body: body,
      ContentLength: body.length
    })
  }
}
