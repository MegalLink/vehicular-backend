import { ResponseFileDto } from 'src/files/domain/dto/reponse_file.dto';

export interface IGeneriFileRepository {
  uploadImage(filePath: string): Promise<ResponseFileDto>;
}
