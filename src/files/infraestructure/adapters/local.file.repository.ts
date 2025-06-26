import { Injectable } from '@nestjs/common';
import { ResponseFileDto } from 'src/files/domain/dto/response_file.dto';
import { IGenericFileRepository } from '../../domain/repository/file.repository.interface';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from 'src/config/env.config';
import * as fs from 'fs';
import { v4 } from 'uuid';
import { join } from 'path';

@Injectable()
export class LocalFilesRepository implements IGenericFileRepository {
  constructor(private readonly _configService: ConfigService) {}

  async uploadFile(
    filePath: string,
    folderOutputPath: string,
  ): Promise<ResponseFileDto> {
    const apiUrl = this._configService.get(EnvironmentConstants.rest_api_url);
    const pathParts = filePath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const fileUrl = `http://${apiUrl}files/local?path=${fileName}`.replace(
      /\\/g,
      '/',
    );

    return {
      fileUrl,
    };
  }

  async uploadBufferFile(
    buffer: Buffer,
    folderOutputPath: string,
  ): Promise<ResponseFileDto> {
    const apiUrl = this._configService.get(EnvironmentConstants.rest_api_url);
    const fileName = `${v4()}.pdf`;
    const localDirectory: string = join(
      process.cwd(),
      'static',
      folderOutputPath,
    );
    const filePath: string = join(localDirectory, fileName);

    return new Promise((resolve, reject) => {
      fs.mkdir(localDirectory, { recursive: true }, (dirErr) => {
        if (dirErr) {
          return reject(new Error('Failed to create directory'));
        }

        fs.writeFile(filePath, buffer, (err) => {
          if (err) {
            return reject(new Error('Failed to save invoice file'));
          }

          resolve({
            fileUrl:
              `http://${apiUrl}files/local?path=${folderOutputPath}/${fileName}`.replace(
                /\\/g,
                '/',
              ),
          });
        });
      });
    });
  }
}
