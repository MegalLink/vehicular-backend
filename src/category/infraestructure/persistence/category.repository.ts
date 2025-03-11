import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/infraestructure/adapters/mongo_base_repository';
import { Category } from '../../domain/entities/category.entity';
import { ICategoryRepository } from '../../domain/repository/category.repository.interface';
import { IResponseCategory } from '../../domain/interfaces/response-category.interface';
import { ObjectId } from 'mongodb';

@Injectable()
export class CategoryRepository
  extends BaseRepository<Category, IResponseCategory>
  implements ICategoryRepository
{
  constructor(
    @InjectModel(Category.name)
    private readonly CategoryModel: Model<Category>,
  ) {
    super(CategoryModel, 'Category');
  }

  transform(entity: Category): IResponseCategory {
    return {
      _id: (entity._id as ObjectId).toString(),
      name: entity.name,
      title: entity.title,
      image: entity.image,
    };
  }
}
