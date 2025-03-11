import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FilesService } from '../../application/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from '../helpers/file_filter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from '../helpers/file_namer.helper';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { ResponseFileDto } from '../../domain/dto/response_file.dto';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
      limits: { fileSize: 5242880 }, // 5MB
      storage: diskStorage({
        destination: './static/images',
        filename: fileNamer,
      }),
    }),
  )
  @ApiOperation({ summary: 'Upload an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The image file to upload (jpg, png,jpeg)',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    type: ResponseFileDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  UploadImage(
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    return this.filesService.uploadImage(image);
  }
  @Get('local/:fileName')
  @ApiOperation({ summary: 'Get a local image' })
  @ApiResponse({ status: 200, description: 'Image retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  getLocalImage(
    @Res() response: Response,
    @Param('fileName') fileName: string,
  ) {
    const path = this.filesService.getStaticFile(fileName);
    response.sendFile(path);
  }
}
