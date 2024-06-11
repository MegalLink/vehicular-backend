import { ResponseFileDto } from '../domain/dto/reponse_file.dto';

export interface IFilesService {
  uploadImage(image: Express.Multer.File): Promise<ResponseFileDto>;
  getStaticImage(imageName: string): string;
}
