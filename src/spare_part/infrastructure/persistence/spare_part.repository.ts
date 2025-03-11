import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SparePart } from '../../domain/entities/spare_part.entity';
import { BaseRepository } from 'src/common/infraestructure/adapters/mongo_base_repository';
import { ObjectId } from 'mongodb';
import { ISparePartRepository } from 'src/spare_part/domain/repository/spare_part.repository.interface';
import { IResponseSparePart } from 'src/spare_part/domain/interfaces/response-spare-part.interface';

@Injectable()
export class SparePartRepository
  extends BaseRepository<SparePart, IResponseSparePart>
  implements ISparePartRepository
{
  constructor(
    @InjectModel(SparePart.name)
    private readonly _sparePartModel: Model<SparePart>,
  ) {
    super(_sparePartModel, 'Repuesto');
  }

  transform(entity: SparePart): IResponseSparePart {
    return {
      _id: (entity._id as ObjectId).toString(),
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
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
