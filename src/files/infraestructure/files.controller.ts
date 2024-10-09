import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FilesService } from '../application/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from '../helpers/file_filter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from '../helpers/file_namer.helper';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
      limits: { fileSize: 300000 },
      storage: diskStorage({
        destination: './static/images',
        filename: fileNamer,
      }),
    }),
  )
  UploadImage(
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    return this.filesService.uploadImage(image);
  }

  @Get('local/:fileName')
  getLocalImage(
    @Res() response: Response,
    @Param('fileName') fileName: string,
  ) {
    const path = this.filesService.getStaticFile(fileName);

    response.sendFile(path);
  }
}
