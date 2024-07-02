import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SparePart } from '../entities/spare_part.entity';
import { ResponseSparePartDto } from '../dto/response_spare_part.dto';
import { BaseRepository } from 'src/common/domain/repository/mongo_base_repository';

@Injectable()
export class SparePartRepository extends BaseRepository<
  SparePart,
  ResponseSparePartDto
> {
  constructor(
    @InjectModel(SparePart.name)
    private readonly _sparePartModel: Model<SparePart>,
  ) {
    super(_sparePartModel, 'Repuesto');
  }

  transform(entity: SparePart): ResponseSparePartDto {
    return {
      _id: entity._id,
      code: entity.code,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      images: entity.images,
      category: entity.category,
      stock: entity.stock,
      brand: entity.brand,
      brandModel: entity.brandModel,
      modelType: entity.modelType,
      modelTypeYear: entity.modelTypeYear,
      userID: entity.userID,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      createdBy: entity.createdBy,
    };
  }
}
