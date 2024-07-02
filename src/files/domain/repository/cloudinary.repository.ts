import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { EnvironmentConstants } from 'src/config/env.config';
import { ResponseFileDto } from 'src/files/domain/dto/reponse_file.dto';
import { IGeneriFileRepository } from './file.repository.interface';
import fs from 'fs';

@Injectable()
export class CloudinaryRepository implements IGeneriFileRepository {
  constructor(private readonly _configService: ConfigService) {
    v2.config({
      cloud_name: this._configService.get(
        EnvironmentConstants.cloudinary_cloud_name,
      ),
      api_key: this._configService.get(EnvironmentConstants.cloudinary_api_key),
      api_secret: this._configService.get(
        EnvironmentConstants.cloudinary_api_secret,
      ),
    });
  }

  async uploadImage(filePath: string): Promise<ResponseFileDto> {
    const environment = this._configService.get(
      EnvironmentConstants.environment,
    );

    return v2.uploader
      .upload(filePath, {
        folder: `${environment}/images`,
      })
      .then((result) => {
        return {
          fileUrl: result.url,
        };
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      })
      .finally(() => {
        fs.unlink(filePath, (err: any) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });
      });
  }
}
