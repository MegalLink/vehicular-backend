import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGenericFileRepository } from '../domain/repository/file.repository.interface';
import { ResponseFileDto } from 'src/files/domain/dto/response_file.dto';
import { FileRepository } from '../infraestructure/adapters/file.repository';
import { join } from 'path';
import { existsSync } from 'fs';
import { IFilesService } from './files.service.interface';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from '../../config/env.config';
import { ImageFileExtensionEnum } from '../infraestructure/helpers/ImageFileExtensionEnum';

@Injectable()
export class FilesService implements IFilesService {
  constructor(
    @Inject(FileRepository)
    private readonly _fileRepository: IGenericFileRepository,
    private readonly _configService: ConfigService,
  ) {}
  async uploadImage(image: Express.Multer.File): Promise<ResponseFileDto> {
    if (!image) {
      throw new BadRequestException(
        'Tipo de archivo de imagen no permitido , tipos de archivo de imagen permitidos: png,jpg,jpeg',
      );
    }
    const environment = this._configService.get(
      EnvironmentConstants.environment,
    );
    const outputFolderPath: string = `${environment}/images`;
    console.log('Trying to upload image to path:', outputFolderPath);
    return this._fileRepository.uploadFile(image.path, outputFolderPath);
  }

  getStaticFile(filePath: string): string {
    const normalizedPath = filePath.replace(/\\/g, '/');
    const fullPath = join(process.cwd(), normalizedPath);

    if (!existsSync(fullPath)) {
      throw new BadRequestException(
        `No se encontró archivo con nombre ${filePath}`,
      );
    }

    return fullPath;
  }
}
