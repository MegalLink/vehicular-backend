import { Module } from '@nestjs/common';
import { BrandService } from './application/brand.service';
import { BrandController } from './infrastructure/brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './domain/entities/brand.entity';
import { BrandRepository } from './domain/repository/brand.repository';
import {
  BrandModel,
  BrandModelSchema,
} from './domain/entities/brand-model.entity';
import {
  BrandModelType,
  BrandModelTypeSchema,
} from './domain/entities/model-type.entity';
import { ModelTypeRepository } from './domain/repository/model-type.repository';
import { BrandModelRepository } from './domain/repository/brand-model.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [BrandController],
  providers: [
    BrandService,
    BrandRepository,
    BrandModelRepository,
    ModelTypeRepository,
  ],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    MongooseModule.forFeature([
      { name: BrandModel.name, schema: BrandModelSchema },
    ]),
    MongooseModule.forFeature([
      { name: BrandModelType.name, schema: BrandModelTypeSchema },
    ]),
  ],
})
export class BrandModule {}
