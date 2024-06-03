import { Inject, Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../domain/dto/create-brand.dto';
import { UpdateBrandDto } from '../domain/dto/update-brand.dto';
import { IBrandService } from './brand.service.interface';
import { IBrandRepository } from '../domain/repository/brand.repository.interface';
import { BrandRepository } from '../domain/repository/brand.repository';
import { ResponseBrandDto } from '../domain/dto/response-brand.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class BrandService implements IBrandService {
  constructor(
    @Inject(BrandRepository)
    private readonly brandRepository: IBrandRepository,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<ResponseBrandDto> {
    const Brand = await this.brandRepository.create(createBrandDto);

    return Brand;
  }

  async findAll(): Promise<ResponseBrandDto[]> {
    const response = await this.brandRepository.findAll();

    return response;
  }

  async findOne(searchParam: string): Promise<ResponseBrandDto> {
    if (isValidObjectId(searchParam)) {
      return await this.brandRepository.findOne({ _id: searchParam });
    }

    return await this.brandRepository.findOne({ name: searchParam });
  }

  async update(
    searchParam: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<ResponseBrandDto> {
    const Brand = await this.brandRepository.update(
      searchParam,
      updateBrandDto,
    );

    return Brand;
  }

  async remove(searchParam: string): Promise<ResponseBrandDto> {
    const deleted_item = await this.brandRepository.remove(searchParam);

    return deleted_item;
  }
}
