import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGeneriFileRepository } from '../domain/repository/file.repository.interface';
import { ResponseFileDto } from 'src/files/domain/dto/reponse_file.dto';
import { FileRepository } from '../domain/repository/file.repository';
import { join } from 'path';
import { existsSync } from 'fs';
import { IFilesService } from './files.service.interface';

@Injectable()
export class FilesService implements IFilesService {
  constructor(
    @Inject(FileRepository)
    private readonly _fileRepository: IGeneriFileRepository,
  ) {}

  async uploadImage(image: Express.Multer.File): Promise<ResponseFileDto> {
    if (!image) {
      throw new BadRequestException(
        'Tipo de archivo de imagen no permitido , tipos de archivo de imagen permitidos: png,jpg,jpeg',
      );
    }

    return this._fileRepository.uploadImage(image.path);
  }

  getStaticImage(imageName: string): string {
    const path: string = join(__dirname, '../../static/images/', imageName);

    if (!existsSync(path)) {
      throw new BadRequestException(
        `No se encontra la imagen con nombre ${imageName}`,
      );
    }

    return path;
  }
}
