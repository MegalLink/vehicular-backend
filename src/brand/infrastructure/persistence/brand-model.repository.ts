import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/infraestructure/adapters/mongo_base_repository';
import { BrandModel } from '../../domain/entities/brand-model.entity';
import { ResponseBrandModelDto } from '../../application/dto/response-brand-model.dto';
import { IBrandModelRepository } from '../../domain/repository/brand-model.repository.interface';
import { ObjectId } from 'mongodb';

@Injectable()
export class BrandModelRepository
  extends BaseRepository<BrandModel, ResponseBrandModelDto>
  implements IBrandModelRepository
{
  constructor(
    @InjectModel(BrandModel.name)
    private readonly model: Model<BrandModel>,
  ) {
    super(model, 'Brand Model');
  }

  transform(entity: BrandModel): ResponseBrandModelDto {
    return {
      _id: (entity._id as ObjectId).toString(),
      name: entity.name,
      brandId: entity.brandId,
    };
  }
}
