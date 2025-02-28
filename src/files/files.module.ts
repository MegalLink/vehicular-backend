import { Module } from '@nestjs/common';
import { FilesService } from './application/files.service';
import { FilesController } from './infraestructure/controllers/files.controller';
import { ConfigModule } from '@nestjs/config';
import { FileRepository } from './infraestructure/adapters/file.repository';

@Module({
  controllers: [FilesController],
  imports: [ConfigModule],
  providers: [FilesService, FileRepository],
  exports: [FilesService, FileRepository],
})
export class FilesModule {}
