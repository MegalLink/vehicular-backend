import { Injectable } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { LocalFilesRepository } from './local.file.repository';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from 'src/config/env.config';
import { IGenericFileRepository } from './file.repository.interface';
import { ResponseFileDto } from 'src/files/domain/dto/reponse_file.dto';
import Buffer from 'node:buffer';

@Injectable()
export class FileRepository implements IGenericFileRepository {
  private readonly _repository: IGenericFileRepository;

  constructor(private readonly _configService: ConfigService) {
    const environment = this._configService.get(
      EnvironmentConstants.environment,
    );

    if (environment === 'dev') {
      this._repository = new LocalFilesRepository(this._configService);
    } else {
      this._repository = new CloudinaryRepository(this._configService);
    }
  }

  async uploadFile(
    filePath: string,
    folderOutputPath: string,
  ): Promise<ResponseFileDto> {
    return await this._repository.uploadFile(filePath, folderOutputPath);
  }

  async uploadBufferFile(
    buffer: Buffer,
    folderOutputPath: string,
  ): Promise<ResponseFileDto> {
    return await this._repository.uploadBufferFile(buffer, folderOutputPath);
  }
}
