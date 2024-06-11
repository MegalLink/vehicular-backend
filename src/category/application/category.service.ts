import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../domain/dto/create-category.dto';
import { UpdateCategoryDto } from '../domain/dto/update-category.dto';
import { ICategoryService } from './category.service.interface';
import { ICategoryRepository } from '../domain/repository/category.repository.interface';
import { CategoryRepository } from '../domain/repository/category.repository';
import { ResponseCategoryDto } from '../domain/dto/response-category.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    const category = await this.categoryRepository.create(createCategoryDto);

    return category;
  }

  async findAll(): Promise<ResponseCategoryDto[]> {
    const response = await this.categoryRepository.findAll();

    return response;
  }

  async findOne(searchParam: string): Promise<ResponseCategoryDto> {
    if (isValidObjectId(searchParam)) {
      return await this.categoryRepository.findOne({ _id: searchParam });
    }
    return await this.categoryRepository.findOne({ name: searchParam });
  }

  async update(
    searchParam: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    const category = await this.categoryRepository.update(
      searchParam,
      updateCategoryDto,
    );

    return category;
  }

  async remove(searchParam: string): Promise<ResponseCategoryDto> {
    const deleted_item = await this.categoryRepository.remove(searchParam);

    return deleted_item;
  }
}
