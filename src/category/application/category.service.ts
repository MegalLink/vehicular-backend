import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryService } from '../domain/ports/category.service.interface';
import { ICategoryRepository } from '../domain/repository/category.repository.interface';
import { CategoryRepository } from '../infraestructure/persistence/category.repository';
import { isValidObjectId } from 'mongoose';
import { IResponseCategory } from '../domain/interfaces/response-category.interface';
import { ICreateCategory } from '../domain/interfaces/create-category.interface';
import { IUpdateCategory } from '../domain/interfaces/update-category.interface';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async create(createCategoryDto: ICreateCategory): Promise<IResponseCategory> {
    const category = await this.categoryRepository.create(createCategoryDto);

    return category;
  }

  async findAll(): Promise<IResponseCategory[]> {
    const response = await this.categoryRepository.findAll();

    return response;
  }

  async findOne(searchParam: string): Promise<IResponseCategory> {
    const query: object = isValidObjectId(searchParam)
      ? { _id: searchParam }
      : { name: searchParam };
    const response = await this.categoryRepository.findOne(query);

    if (!response) {
      throw new NotFoundException(`Categoria con ${query} no encontrada`);
    }

    return response;
  }

  async update(
    searchParam: string,
    updateCategoryDto: IUpdateCategory,
  ): Promise<IResponseCategory> {
    const category = await this.categoryRepository.update(
      searchParam,
      updateCategoryDto,
    );

    return category;
  }

  async remove(searchParam: string): Promise<IResponseCategory> {
    const deleted_item = await this.categoryRepository.remove(searchParam);

    return deleted_item;
  }
}
