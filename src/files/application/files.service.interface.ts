import { ResponseFileDto } from '../domain/dto/response_file.dto';

export interface IFilesService {
  uploadImage(image: Express.Multer.File): Promise<ResponseFileDto>;
  getStaticFile(imageName: string): string;
}
