import { Injectable } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { LocalFilesRepository } from './local.image.repository';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from 'src/config/env.config';
import { IGeneriFileRepository } from './file.repository.interface';
import { ResponseFileDto } from 'src/files/domain/dto/reponse_file.dto';

@Injectable()
export class FileRepository implements IGeneriFileRepository {
  private readonly _repository: IGeneriFileRepository;

  constructor(private readonly _configService: ConfigService) {
    const environment = this._configService.get(
      EnvironmentConstants.environment,
    );
    console.log('Environment', environment);

    if (environment === 'dev') {
      this._repository = new LocalFilesRepository(this._configService);
    } else {
      this._repository = new CloudinaryRepository(this._configService);
    }
  }

  async uploadImage(filePath: string): Promise<ResponseFileDto> {
    return await this._repository.uploadImage(filePath);
  }
}
