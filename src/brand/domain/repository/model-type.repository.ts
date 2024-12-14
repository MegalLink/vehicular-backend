import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/domain/repository/mongo_base_repository';

import { BrandModelType } from '../entities/model-type.entity';
import { ResponseModelTypeDto } from '../dto/response-model-type.dto';
import { IModelTypeRepository } from './model-type.repository.interface';
import { ObjectId } from 'mongodb';

@Injectable()
export class ModelTypeRepository
  extends BaseRepository<BrandModelType, ResponseModelTypeDto>
  implements IModelTypeRepository
{
  constructor(
    @InjectModel(BrandModelType.name)
    private readonly model: Model<BrandModelType>,
  ) {
    super(model, 'Brand Model');
  }

  transform(entity: BrandModelType): ResponseModelTypeDto {
    return {
      _id: (entity._id as ObjectId).toString(),
      name: entity.name,
      modelId: entity.modelId,
    };
  }
}
