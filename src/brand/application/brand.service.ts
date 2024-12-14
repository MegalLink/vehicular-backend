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

  async createBrand(createBrandDto: CreateBrandDto): Promise<ResponseBrandDto> {
    return await this.brandRepository.create(createBrandDto);
  }

  async findAllBrands(): Promise<ResponseBrandDto[]> {
    return await this.brandRepository.findAll();
  }

  async findOneBrand(id: string): Promise<ResponseBrandDto> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`ID de marca ${id} no válido`);
    }

    const brand = await this.brandRepository.findOne({ _id: id });
    if (!brand) {
      throw new NotFoundException(`Marca con id ${id} no encontrada`);
    }

    return brand;
  }

  async updateBrand(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<ResponseBrandDto> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`ID de marca ${id} no válido`);
    }

    const brand = await this.brandRepository.findOne({ _id: id });
    if (!brand) {
      throw new NotFoundException(`Marca con id ${id} no encontrada`);
    }

    return await this.brandRepository.update(id, updateBrandDto);
  }

  async removeBrand(id: string): Promise<ResponseBrandDto> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`ID de marca ${id} no válido`);
    }

    const brand = await this.brandRepository.findOne({ _id: id });
    if (!brand) {
      throw new NotFoundException(`Marca con id ${id} no encontrada`);
    }

    const brandModels = await this.modelRepository.findAll({
      brandId: brand._id,
    });

    if (brandModels.length > 0) {
      throw new NotFoundException(
        `No se puede eliminar la marca porque tiene ${brandModels.length} modelos asociados`,
      );
    }

    return await this.brandRepository.remove(id);
  }

  async createBrandModel(
    createDto: CreateBrandModelDto,
  ): Promise<ResponseBrandModelDto> {
    const brand = await this.brandRepository.findOne({
      _id: createDto.brandId,
    });
    if (!brand) {
      throw new NotFoundException(`Marca con id ${createDto.brandId} no encontrada`);
    }

    return this.modelRepository.create({
      name: createDto.name,
      brandId: brand._id,
    });
  }

  async findAllBrandModels(brandId?: string): Promise<ResponseBrandModelDto[]> {
    const query: Record<string, any> = {};
    if (brandId) {
      if (!isValidObjectId(brandId)) {
        throw new NotFoundException(`ID de marca ${brandId} no válido`);
      }
      const brand = await this.brandRepository.findOne({ _id: brandId });
      if (!brand) {
        throw new NotFoundException(`Marca con id ${brandId} no encontrada`);
      }
      query.brandId = brandId;
    }

    return this.modelRepository.findAll(query);
  }

  async updateBrandModel(
    id: string,
    updateDto: UpdateBrandModelDto,
  ): Promise<ResponseBrandModelDto> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`ID de modelo ${id} no válido`);
    }

    const brandModel = await this.modelRepository.findOne({ _id: id });
    if (!brandModel) {
      throw new NotFoundException(`Modelo con id ${id} no encontrado`);
    }

    if (updateDto.brandId) {
      const brand = await this.brandRepository.findOne({ _id: updateDto.brandId });
      if (!brand) {
        throw new NotFoundException(`Marca con id ${updateDto.brandId} no encontrada`);
      }
    }

    return await this.modelRepository.update(id, {
      name: updateDto.name,
      brandId: updateDto.brandId || brandModel.brandId,
    });
  }

  async removeBrandModel(id: string): Promise<ResponseBrandModelDto> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`ID de modelo ${id} no válido`);
    }

    const brandModel = await this.modelRepository.findOne({ _id: id });
    if (!brandModel) {
      throw new NotFoundException(`Modelo con id ${id} no encontrado`);
    }

    const modelTypes = await this.typeRepository.findAll({
      modelId: brandModel._id,
    });
    if (modelTypes.length > 0) {
      throw new NotFoundException(
        `No se puede eliminar el modelo porque tiene ${modelTypes.length} tipos asociados`,
      );
    }

    return await this.modelRepository.remove(id);
  }

  async createBrandType(
    createDto: CreateModelTypeDto,
  ): Promise<ResponseModelTypeDto> {
    console.log("CREATE",createDto)
    const model = await this.modelRepository.findOne({
      _id: createDto.modelId,
    });
    if (!model) {
      throw new NotFoundException(`Modelo con id ${createDto.modelId} no encontrado`);
    }
    console.log("HERE")

    return this.typeRepository.create({
      name: createDto.name,
      modelId: model._id,
    });
  }

  async findAllModelTypes(modelId?: string): Promise<ResponseModelTypeDto[]> {
    const query: Record<string, any> = {};
    if (modelId) {
      if (!isValidObjectId(modelId)) {
        throw new NotFoundException(`ID de modelo ${modelId} no válido`);
      }
      const model = await this.modelRepository.findOne({ _id: modelId });
      if (!model) {
        throw new NotFoundException(`Modelo con id ${modelId} no encontrado`);
      }
      query.modelId = modelId;
    }

    return this.typeRepository.findAll(query);
  }

  async updateModelType(
    id: string,
    updateDto: UpdateModelTypeDto,
  ): Promise<ResponseModelTypeDto> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`ID de tipo ${id} no válido`);
    }

    const modelType = await this.typeRepository.findOne({ _id: id });
    if (!modelType) {
      throw new NotFoundException(`Tipo con id ${id} no encontrado`);
    }

    if (updateDto.modelId) {
      const model = await this.modelRepository.findOne({ _id: updateDto.modelId });
      if (!model) {
        throw new NotFoundException(`Modelo con id ${updateDto.modelId} no encontrado`);
      }
    }

    return await this.typeRepository.update(id, {
      name: updateDto.name,
      modelId: updateDto.modelId || modelType.modelId,
    });
  }

  async removeModelType(id: string): Promise<ResponseModelTypeDto> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`ID de tipo ${id} no válido`);
    }

    const modelType = await this.typeRepository.findOne({ _id: id });
    if (!modelType) {
      throw new NotFoundException(`Tipo con id ${id} no encontrado`);
    }

    return await this.typeRepository.remove(id);
  }
}
