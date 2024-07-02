import { CreateBrandDto } from '../domain/dto/create-brand.dto';
import { ResponseBrandDto } from '../domain/dto/response-brand.dto';
import { UpdateBrandDto } from '../domain/dto/update-brand.dto';
import { CreateBrandModelDto } from '../domain/dto/create-brand-model.dto';
import { ResponseBrandModelDto } from '../domain/dto/response-brand-model.dto';
import { CreateModelTypeDto } from '../domain/dto/create-model-type.dto';
import { ResponseModelTypeDto } from '../domain/dto/response-model-type.dto';

export interface IBrandService {
  createBrand(createBrandDto: CreateBrandDto): Promise<ResponseBrandDto>;
  createBrandModel(
    createDto: CreateBrandModelDto,
  ): Promise<ResponseBrandModelDto>;
  createBrandType(createDto: CreateModelTypeDto): Promise<ResponseModelTypeDto>;
  findAllBrands(): Promise<ResponseBrandDto[]>;
  findAllBrandModels(brand: string): Promise<ResponseBrandModelDto[]>;
  findAllModelTypes(model: string): Promise<ResponseModelTypeDto[]>;
  findOneBrand(searchParam: string): Promise<ResponseBrandDto>;
  removeBrand(searchParam: string): Promise<ResponseBrandDto>;
  updateBrand(
    searchParam: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<ResponseBrandDto>;
}
