import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/domain/repository/mongo_base_repository';
import { Brand } from '../entities/brand.entity';
import { ResponseBrandDto } from '../dto/response-brand.dto';
import { IBrandRepository } from './brand.repository.interface';

@Injectable()
export class BrandRepository
  extends BaseRepository<Brand, ResponseBrandDto>
  implements IBrandRepository
{
  constructor(
    @InjectModel(Brand.name)
    private readonly BrandModel: Model<Brand>,
  ) {
    super(BrandModel, 'Spare part');
  }

  transform(entity: Brand): ResponseBrandDto {
    return {
      _id: entity._id,
      name: entity.name,
      models: entity.models,
      image: entity.image,
    };
  }
}
