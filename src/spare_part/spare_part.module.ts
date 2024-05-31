import { Module } from '@nestjs/common';
import { SparePartService } from './application/spare_part.service';
import { SparePartController } from './infrastructure/spare_part.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SparePart,
  SparePartSchema,
} from './domain/entities/spare_part.entity';
import { SparePartRepository } from './domain/repository/spare_part_db';

@Module({
  controllers: [SparePartController],
  providers: [SparePartService, SparePartRepository],
  imports: [
    MongooseModule.forFeature([
      { name: SparePart.name, schema: SparePartSchema },
    ]),
  ],
})
export class SparePartModule {}
