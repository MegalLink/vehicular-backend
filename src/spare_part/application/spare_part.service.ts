import { Inject, Injectable } from '@nestjs/common';
import { CreateSparePartDto } from '../domain/dto/create_spare_part.dto';
import { UpdateSparePartDto } from '../domain/dto/update_spare_part.dto';
import { ISparePartService } from './spare_part.service.interface';
import { SparePartRepository } from '../domain/repository/spare_part.repository';
import { ISparePartRepository } from '../domain/repository/spare_part.respository.interface';
import { ResponseSparePartDto } from '../domain/dto/response_spare_part.dto';
import { isValidObjectId } from 'mongoose';
import { QuerySparePartDto } from '../domain/dto/query_spare_part.dto';

@Injectable()
export class SparePartService implements ISparePartService {
  constructor(
    @Inject(SparePartRepository)
    private readonly sparePartRepository: ISparePartRepository,
  ) {}

  async create(
    createSparePartDto: CreateSparePartDto,
  ): Promise<ResponseSparePartDto> {
    const sparePart = await this.sparePartRepository.create(createSparePartDto);

    return sparePart;
  }

  async findAll(queryDto: QuerySparePartDto): Promise<ResponseSparePartDto[]> {
    const query = this.buildQuery(queryDto);
    return this.sparePartRepository.findAll(query);
  }

  private buildQuery(filters: QuerySparePartDto): Record<string, any> {
    const query: Record<string, any> = {};

    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.minStock !== undefined) {
      query.stock = { ...query.stock, $gte: filters.minStock };
    }
    if (filters.maxStock !== undefined) {
      query.stock = { ...query.stock, $lte: filters.maxStock };
    }
    if (filters.minPrice !== undefined) {
      query.price = { ...query.price, $gte: filters.minPrice };
    }
    if (filters.maxPrice !== undefined) {
      query.price = { ...query.price, $lte: filters.maxPrice };
    }
    if (filters.partModel) {
      query.part_model = filters.partModel;
    }
    if (filters.year) {
      query.year = filters.year;
    }

    return query;
  }

  async findOne(searchParam: string): Promise<ResponseSparePartDto> {
    if (isValidObjectId(searchParam)) {
      return await this.sparePartRepository.findOne({ _id: searchParam });
    }
    return await this.sparePartRepository.findOne({ code: searchParam });
  }

  async update(
    searchParam: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<ResponseSparePartDto> {
    const sparePart = await this.sparePartRepository.update(
      searchParam,
      updateSparePartDto,
    );

    return sparePart;
  }

  async remove(searchParam: string): Promise<ResponseSparePartDto> {
    const deleted_item = await this.sparePartRepository.remove(searchParam);

    return deleted_item;
  }
}
