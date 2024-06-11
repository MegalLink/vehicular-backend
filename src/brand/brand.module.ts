import { Module } from '@nestjs/common';
import { BrandService } from './application/brand.service';
import { BrandController } from './infrastructure/brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './domain/entities/brand.entity';
import { BrandRepository } from './domain/repository/brand.repository';

@Module({
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
})
export class BrandModule {}
