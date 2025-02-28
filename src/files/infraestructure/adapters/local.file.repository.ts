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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    folderOutputPath: string,
  ): Promise<ResponseFileDto> {
    const apiUrl = this._configService.get(EnvironmentConstants.rest_api_url);
    const pathParts = filePath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    return {
      fileUrl: `http://${apiUrl}files/local/${fileName}`,
    };
  }

  async uploadBufferFile(
    buffer: Buffer,
    folderOutputPath: string,
  ): Promise<ResponseFileDto> {
    const apiUrl = this._configService.get(EnvironmentConstants.rest_api_url);
    const fileName = `${v4()}.pdf`; // Generating a unique file name
    const localDirectory: string = join(
      process.cwd(),
      `static/${folderOutputPath}/`,
    );
    const filePath: string = join(localDirectory, fileName);

    // Ensure folder exists and save the file
    return new Promise((resolve, reject) => {
      fs.mkdir(folderOutputPath, { recursive: true }, (dirErr) => {
        if (dirErr) {
          return reject(new Error('Failed to create directory'));
        }

        // Save the buffer to the local file system with the file name
        fs.writeFile(filePath, buffer, (err) => {
          if (err) {
            return reject(new Error('Failed to save invoice file'));
          }

          // Resolve with the file URL, linking to the saved file
          resolve({
            fileUrl: `http://${apiUrl}files/local/${fileName}`,
          });
        });
      });
    });
  }
}
