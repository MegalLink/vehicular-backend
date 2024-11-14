import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { UpdateBrandModelDto } from '../domain/dto/update-brand-model.dto';
import { UpdateModelTypeDto } from '../domain/dto/update-model-type.dto';

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

  async createBrandModel(
    createDto: CreateBrandModelDto,
  ): Promise<ResponseBrandModelDto> {
    const brand = await this.brandRepository.findOne({
      name: createDto.brandName,
    });
    if (!brand) {
      throw new NotFoundException(`Marca ${createDto.brandName} no encontrada`);
    }

    return this.modelRepository.create({
      name: `${brand.name} ${createDto.name}`,
      brandName: brand.name,
    });
  }

  async createBrandType(
    createDto: CreateModelTypeDto,
  ): Promise<ResponseModelTypeDto> {
    const model = await this.modelRepository.findOne({
      name: createDto.modelName,
    });
    if (!model) {
      throw new NotFoundException(
        `Modelo ${createDto.modelName} no encontrado`,
      );
    }

    return this.typeRepository.create({
      name: `${model.name} ${createDto.name}`,
      modelName: model.name,
    });
  }

  findAllBrandModels(brandName: string): Promise<ResponseBrandModelDto[]> {
    const query: Record<string, any> = {};
    if (brandName) {
      query.brandName = brandName;
    }

    return this.modelRepository.findAll(query);
  }

  findAllModelTypes(model: string): Promise<ResponseModelTypeDto[]> {
    const query: Record<string, any> = {};
    if (model) {
      query.modelName = model;
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
    const query: object = isValidObjectId(searchParam)
      ? { _id: searchParam }
      : { name: searchParam };
    const response = await this.brandRepository.findOne(query);

    if (!response) {
      throw new NotFoundException(`Marca con ${query} no encontrada`);
    }

    return response;
  }

  async updateBrand(
    searchParam: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<ResponseBrandDto> {
    return await this.brandRepository.update(searchParam, updateBrandDto);
  }

  async removeBrand(id: string): Promise<ResponseBrandDto> {
    const brand = await this.brandRepository.findOne({ _id: id });
    if (!brand) {
      throw new NotFoundException(`Marca con id ${id} no encontrada`);
    }

    const brandModels = await this.modelRepository.findAll({
      brandName: brand.name,
    });

    if (brandModels.length > 0) {
      throw new NotFoundException(
        `No se puede eliminar la marca ${brand.name} porque tiene modelos de marca asociados`,
      );
    }

    return await this.brandRepository.remove(id);
  }

  async updateBrandModel(
    id: string,
    updateDto: UpdateBrandModelDto,
  ): Promise<ResponseBrandModelDto> {
    const brandModel = await this.modelRepository.findOne({
      _id: id,
    });
    if (!brandModel) {
      throw new NotFoundException(`Modelo de marca ${id} no encontrado`);
    }

    return await this.modelRepository.update(id, {
      name: `${brandModel.brandName} ${updateDto.name}`,
      brandName: brandModel.brandName,
    });
  }

  async removeBrandModel(id: string): Promise<ResponseBrandModelDto> {
    const brandModel = await this.modelRepository.findOne({
      _id: id,
    });

    if (!brandModel) {
      throw new NotFoundException(`Modelo de marca ${id} no encontrado`);
    }

    const modelTypes = await this.typeRepository.findAll({
      modelName: brandModel.name,
    });
    if (modelTypes.length > 0) {
      throw new NotFoundException(
        `No se puede eliminar el modelo de marca ${brandModel.name} porque tiene tipos de modelo asociados`,
      );
    }

    return await this.modelRepository.remove(id);
  }

  async updateModelType(
    id: string,
    updateDto: UpdateModelTypeDto,
  ): Promise<ResponseModelTypeDto> {
    const modelType = await this.typeRepository.findOne({ _id: id });
    if (!modelType) {
      throw new NotFoundException(`Tipo de modelo con id ${id} no encontrado`);
    }

    return await this.typeRepository.update(id, {
      name: `${modelType.modelName} ${updateDto.name}`,
      modelName: modelType.modelName,
    });
  }

  async removeModelType(id: string): Promise<ResponseModelTypeDto> {
    const modelType = await this.typeRepository.findOne({ _id: id });
    if (!modelType) {
      throw new NotFoundException(`Tipo de modelo con id ${id} no encontrado`);
    }

    return await this.typeRepository.remove(id);
  }
}
