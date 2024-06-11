import { CreateCategoryDto } from '../domain/dto/create-category.dto';
import { ResponseCategoryDto } from '../domain/dto/response-category.dto';
import { UpdateCategoryDto } from '../domain/dto/update-category.dto';

export interface ICategoryService {
  create(createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto>;
  findAll(): Promise<ResponseCategoryDto[]>;
  findOne(searchParam: string): Promise<ResponseCategoryDto>;
  remove(searchParam: string): Promise<ResponseCategoryDto>;
  update(
    searchParam: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseCategoryDto>;
}
