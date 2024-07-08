import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
