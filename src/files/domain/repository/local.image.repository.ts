import { Injectable } from '@nestjs/common';
import { ResponseFileDto } from 'src/files/domain/dto/reponse_file.dto';
import { IGeneriFileRepository } from './file.repository.interface';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from 'src/config/env.config';

@Injectable()
export class LocalFilesRepository implements IGeneriFileRepository {
  constructor(private readonly _configService: ConfigService) {}

  async uploadImage(filePath: string): Promise<ResponseFileDto> {
    const port = this._configService.get(EnvironmentConstants.port);
    const pathParts = filePath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    return {
      fileUrl: `http://localhost:${port}/api/v1/files/image/${fileName}`,
    };
  }
}
