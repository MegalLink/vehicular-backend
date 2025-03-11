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
      const uploadStream = v2.uploader.upload_stream({
        folder: folderOutputPath,
      });

      // Convert Buffer to Readable Stream
      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null); // End the stream
      readableStream.pipe(uploadStream);

      // Wrap uploadStream in a Promise to handle with then/catch
      const streamPromise = new Promise((resolveStream, rejectStream) => {
        uploadStream.on('finish', resolveStream); // Resolve when the stream finishes
        uploadStream.on('error', rejectStream); // Reject on stream error
      });

      streamPromise
        .then((result: UploadApiResponse) => {
          resolve({
            fileUrl: result.url,
          });
        })
        .catch((error) => {
          reject(
            new InternalServerErrorException(
              `Cloudinary upload failed: ${error.message}`,
            ),
          );
        });
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
