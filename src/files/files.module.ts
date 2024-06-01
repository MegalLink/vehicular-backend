import { Module } from '@nestjs/common';
import { FilesService } from './application/files.service';
import { FilesController } from './infraestructure/files.controller';
import { ConfigModule } from '@nestjs/config';
import { FileRepository } from './domain/repository/file.repository';

@Module({
  controllers: [FilesController],
  imports: [ConfigModule],
  providers: [FilesService, FileRepository],
})
export class FilesModule {}
