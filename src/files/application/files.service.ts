import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGenericFileRepository } from '../domain/repository/file.repository.interface';
import { ResponseFileDto } from 'src/files/domain/dto/reponse_file.dto';
import { FileRepository } from '../domain/repository/file.repository';
import { join } from 'path';
import { existsSync } from 'fs';
import { IFilesService } from './files.service.interface';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from '../../config/env.config';
import { ImageFileExtensionEnum } from '../helpers/ImageFileExtensionEnum';

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

    return this._fileRepository.uploadFile(image.path, outputFolderPath);
  }

  getStaticFile(fileName: string): string {
    const fileExtension = fileName.split('.').pop();
    const imageFormatsArray: string[] = Object.values(ImageFileExtensionEnum);
    let fileExtensionFolder: string = '';

    switch (true) {
      case imageFormatsArray.includes(fileExtension!):
        fileExtensionFolder = 'images';
        break;
      default:
        fileExtensionFolder = 'pdf';
        break;
    }

    return this._getStaticFile(fileName, fileExtensionFolder);
  }

  private _getStaticFile(fileName: string, staticPath: string): string {
    const imagesDirPath: string = join(process.cwd(), `static/${staticPath}/`);
    const filePath: string = join(imagesDirPath, fileName);

    if (!existsSync(filePath)) {
      throw new BadRequestException(
        `No se encontró archivo con nombre ${fileName}`,
      );
    }

    return filePath;
  }
}
