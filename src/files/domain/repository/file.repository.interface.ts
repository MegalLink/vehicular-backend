import { ResponseFileDto } from 'src/files/domain/dto/response_file.dto';
import * as Buffer from 'node:buffer';

export interface IGenericFileRepository {
  uploadFile(
    filePath: string,
    folderOutputPath: string,
  ): Promise<ResponseFileDto>;

  uploadBufferFile(
    buffer: Buffer,
    folderOutputPath: string,
  ): Promise<ResponseFileDto>;
}
