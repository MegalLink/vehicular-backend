import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/domain/repository/mongo_base_repository';
import { Brand } from '../entities/brand.entity';
import { ResponseBrandDto } from '../dto/response-brand.dto';
import { IBrandRepository } from './brand.repository.interface';
import { ObjectId } from 'mongodb';

@Injectable()
export class BrandRepository
  extends BaseRepository<Brand, ResponseBrandDto>
  implements IBrandRepository
{
  constructor(
    @InjectModel(Brand.name)
    private readonly Brand: Model<Brand>,
  ) {
    super(Brand, 'Brand');
  }

  transform(entity: Brand): ResponseBrandDto {
    return {
      _id: (entity._id as ObjectId).toString(),
      name: entity.name,
      image: entity.image,
    };
  }
}
