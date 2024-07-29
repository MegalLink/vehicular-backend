import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/domain/repository/mongo_base_repository';
import { Category } from '../entities/category.entity';
import { ResponseCategoryDto } from '../dto/response-category.dto';
import { ICategoryRepository } from './category.repository.interface';
import { ObjectId } from 'mongodb';

@Injectable()
export class CategoryRepository
  extends BaseRepository<Category, ResponseCategoryDto>
  implements ICategoryRepository
{
  constructor(
    @InjectModel(Category.name)
    private readonly CategoryModel: Model<Category>,
  ) {
    super(CategoryModel, 'Spare part');
  }

  transform(entity: Category): ResponseCategoryDto {
    return {
      _id: (entity._id as ObjectId).toString(),
      name: entity.name,
      title: entity.title,
      image: entity.image,
    };
  }
}
