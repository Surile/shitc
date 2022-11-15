import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Shop } from 'src/common/entity'
import { Photo } from 'src/common/entity/photo.entity'
import { OssService } from 'src/shared/oss/oss.service'
import { Repository } from 'typeorm'

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(Photo) private readonly photoReo: Repository<Photo>,
    @InjectRepository(Shop) private readonly shopReo: Repository<Shop>,
    @Inject(OssService) private readonly ossService: OssService
  ) {}

  async updateFile(param) {
    return this.ossService.putObject(param)
  }
}
