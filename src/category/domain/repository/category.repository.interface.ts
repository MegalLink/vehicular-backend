import { CreateCategoryDto } from '../dto/create-category.dto';
import { ResponseCategoryDto } from '../dto/response-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export interface ICategoryRepository {
  create(createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto>;
  findAll(): Promise<ResponseCategoryDto[]>;
  findOne(searchParam: object): Promise<ResponseCategoryDto | undefined>;
  remove(searchParam: string): Promise<ResponseCategoryDto>;
  update(
    searchParam: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseCategoryDto>;
}
