import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2, UploadApiResponse } from 'cloudinary';
import { EnvironmentConstants } from 'src/config/env.config';
import { ResponseFileDto } from 'src/files/domain/dto/response_file.dto';
import { IGenericFileRepository } from '../../domain/repository/file.repository.interface';
import * as fs from 'fs';
import Buffer from 'node:buffer';
import { Readable } from 'node:stream';

@Injectable()
export class CloudinaryRepository implements IGenericFileRepository {
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

  async uploadFile(
    filePath: string,
    folderOutputPath: string,
  ): Promise<ResponseFileDto> {
    return this._uploadFileCloudinary(filePath, folderOutputPath);
  }

  async uploadBufferFile(
    buffer: Buffer,
    folderOutputPath: string,
  ): Promise<ResponseFileDto> {
    return new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        {
          folder: folderOutputPath,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(
              new InternalServerErrorException(
                `Cloudinary upload failed: ${error.message}`,
              ),
            );
          }
          if (!result) {
            return reject(
              new InternalServerErrorException(
                'No se recibió respuesta de Cloudinary',
              ),
            );
          }
          console.log('Upload successful:', {
            url: result.secure_url,
            format: result.format,
            bytes: result.bytes,
            width: result.width,
            height: result.height,
          });
          resolve({
            fileUrl: result.secure_url || result.url,
          });
        },
      );

      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  }

  private async _uploadFileCloudinary(
    localFilePath: string,
    folderOutputPath: string,
  ): Promise<ResponseFileDto> {
    return v2.uploader
      .upload(localFilePath, {
        folder: folderOutputPath,
      })
      .then((result: UploadApiResponse) => {
        return {
          fileUrl: result.url,
        };
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      })
      .finally(() => {
        fs.unlink(localFilePath, (err: any) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });
      });
  }
}
