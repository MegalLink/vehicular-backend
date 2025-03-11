import { CreateBrandDto } from '../../application/dto/create-brand.dto';
import { ResponseBrandDto } from '../../application/dto/response-brand.dto';
import { UpdateBrandDto } from '../../application/dto/update-brand.dto';
import { CreateBrandModelDto } from '../../application/dto/create-brand-model.dto';
import { ResponseBrandModelDto } from '../../application/dto/response-brand-model.dto';
import { CreateModelTypeDto } from '../../application/dto/create-model-type.dto';
import { ResponseModelTypeDto } from '../../application/dto/response-model-type.dto';
import { UpdateBrandModelDto } from '../../application/dto/update-brand-model.dto';
import { UpdateModelTypeDto } from '../../application/dto/update-model-type.dto';
import { QueryBrandoModelDto } from '../../application/dto/query-brand-models.dto';
import { QueryBrandoModelTypeDto } from '../../application/dto/query-brand-model-type.dto';

export interface IBrandService {
  createBrand(createBrandDto: CreateBrandDto): Promise<ResponseBrandDto>;
  createBrandModel(
    createDto: CreateBrandModelDto,
  ): Promise<ResponseBrandModelDto>;
  createBrandType(createDto: CreateModelTypeDto): Promise<ResponseModelTypeDto>;
  findAllBrands(): Promise<ResponseBrandDto[]>;
  findAllBrandModels(
    query: QueryBrandoModelDto,
  ): Promise<ResponseBrandModelDto[]>;
  findAllModelTypes(
    modelQuery: QueryBrandoModelTypeDto,
  ): Promise<ResponseModelTypeDto[]>;
  findOneBrand(searchParam: string): Promise<ResponseBrandDto>;
  removeBrand(searchParam: string): Promise<ResponseBrandDto>;
  updateBrand(
    searchParam: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<ResponseBrandDto>;
  updateBrandModel(
    searchParam: string,
    updateDto: UpdateBrandModelDto,
  ): Promise<ResponseBrandModelDto>;
  removeBrandModel(searchParam: string): Promise<ResponseBrandModelDto>;
  updateModelType(
    searchParam: string,
    updateDto: UpdateModelTypeDto,
  ): Promise<ResponseModelTypeDto>;
  removeModelType(searchParam: string): Promise<ResponseModelTypeDto>;
}
