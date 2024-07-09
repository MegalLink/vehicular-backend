import { Module } from '@nestjs/common';
import { SparePartService } from './application/spare_part.service';
import { SparePartController } from './infrastructure/spare_part.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SparePart,
  SparePartSchema,
} from './domain/entities/spare_part.entity';
import { SparePartRepository } from './domain/repository/spare_part.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SparePartController],
  providers: [SparePartService, SparePartRepository],
  imports: [
    MongooseModule.forFeature([
      { name: SparePart.name, schema: SparePartSchema },
    ]),
    AuthModule,
  ],
  exports: [SparePartService],
})
export class SparePartModule {}
