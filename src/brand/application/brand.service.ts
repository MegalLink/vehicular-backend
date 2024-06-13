import { Inject, Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../domain/dto/create-brand.dto';
import { UpdateBrandDto } from '../domain/dto/update-brand.dto';
import { IBrandService } from './brand.service.interface';
import { IBrandRepository } from '../domain/repository/brand.repository.interface';
import { BrandRepository } from '../domain/repository/brand.repository';
import { ResponseBrandDto } from '../domain/dto/response-brand.dto';
import { isValidObjectId } from 'mongoose';
import { CreateBrandModelDto } from '../domain/dto/create-brand-model.dto';
import { CreateModelTypeDto } from '../domain/dto/create-model-type.dto';
import { ResponseBrandModelDto } from '../domain/dto/response-brand-model.dto';
import { ResponseModelTypeDto } from '../domain/dto/response-model-type.dto';
import { BrandModelRepository } from '../domain/repository/brand-model.repository';
import { IBrandModelRepository } from '../domain/repository/brand-model.repository.interface';
import { IModelTypeRepository } from '../domain/repository/model-type.repository.interface';
import { ModelTypeRepository } from '../domain/repository/model-type.repository';

@Injectable()
export class BrandService implements IBrandService {
  constructor(
    @Inject(BrandRepository)
    private readonly brandRepository: IBrandRepository,
    @Inject(BrandModelRepository)
    private readonly modelRepository: IBrandModelRepository,
    @Inject(ModelTypeRepository)
    private readonly typeRepository: IModelTypeRepository,
  ) {}

  createBrandModel(
    createDto: CreateBrandModelDto,
  ): Promise<ResponseBrandModelDto> {
    return this.modelRepository.create(createDto);
  }
  createBrandType(
    createDto: CreateModelTypeDto,
  ): Promise<ResponseModelTypeDto> {
    return this.typeRepository.create(createDto);
  }
  findAllBrandModels(brand: string): Promise<ResponseBrandModelDto[]> {
    const query: Record<string, any> = {};

    if (brand) {
      query.brandName = brand;
    }

    return this.modelRepository.findAll(query);
  }
  findAllModelTypes(model: string): Promise<ResponseModelTypeDto[]> {
    const query: Record<string, any> = {};

    if (model) {
      query.brandModel = model;
    }

    return this.typeRepository.findAll(query);
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<ResponseBrandDto> {
    return await this.brandRepository.create(createBrandDto);
  }

  async findAllBrands(): Promise<ResponseBrandDto[]> {
    return await this.brandRepository.findAll();
  }

  async findOneBrand(searchParam: string): Promise<ResponseBrandDto> {
    if (isValidObjectId(searchParam)) {
      return await this.brandRepository.findOne({ _id: searchParam });
    }

    return await this.brandRepository.findOne({ name: searchParam });
  }

  async updateBrand(
    searchParam: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<ResponseBrandDto> {
    return await this.brandRepository.update(searchParam, updateBrandDto);
  }

  async removeBrand(searchParam: string): Promise<ResponseBrandDto> {
    return await this.brandRepository.remove(searchParam);
  }
}
