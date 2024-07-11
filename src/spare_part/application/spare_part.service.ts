import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSparePartDto } from '../domain/dto/create_spare_part.dto';
import { UpdateSparePartDto } from '../domain/dto/update_spare_part.dto';
import { ISparePartService } from './spare_part.service.interface';
import { SparePartRepository } from '../domain/repository/spare_part.repository';
import { ISparePartRepository } from '../domain/repository/spare_part.respository.interface';
import { ResponseSparePartDto } from '../domain/dto/response_spare_part.dto';
import { isValidObjectId } from 'mongoose';
import { QuerySparePartDto } from '../domain/dto/query_spare_part.dto';
import { ResponseUserDbDto } from 'src/auth/domain/dto/response-user-db.dto';

@Injectable()
export class SparePartService implements ISparePartService {
  constructor(
    @Inject(SparePartRepository)
    private readonly sparePartRepository: ISparePartRepository,
  ) {}

  async create(
    createSparePartDto: CreateSparePartDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseSparePartDto> {
    const createSparePart = {
      ...createSparePartDto,
      user_id: user._id,
      createdBy: user.userName,
    };
    return await this.sparePartRepository.create(createSparePart);
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
    if (filters.brand) {
      query.brand = filters.brand;
    }
    if (filters.brandModel) {
      query.brandModel = filters.brandModel;
    }
    if (filters.modelType) {
      query.modelType = filters.modelType;
    }
    if (filters.modelTypeYear) {
      query.modelTypeYear = filters.modelTypeYear;
    }
    if (filters.search) {
      const searchTerms = filters.search
        .split(' ')
        .map((term) => new RegExp(term, 'i'));
      query.$and = searchTerms.map((term) => ({
        $or: [
          { name: { $regex: term } },
          { description: { $regex: term } },
          { brand: { $regex: term } },
          { brandModel: { $regex: term } },
          { modelType: { $regex: term } },
          { category: { $regex: term } },
        ],
      }));
    }

    return query;
  }

  async findOne(searchParam: string): Promise<ResponseSparePartDto> {
    const query: object = isValidObjectId(searchParam)
      ? { _id: searchParam }
      : { code: searchParam };
    const response = await this.sparePartRepository.findOne(query);

    if (!response) {
      throw new NotFoundException(`Repuesto con ${query} no encontrado`);
    }

    return response;
  }

  async update(
    searchParam: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<ResponseSparePartDto> {
    return await this.sparePartRepository.update(
      searchParam,
      updateSparePartDto,
    );
  }

  async remove(searchParam: string): Promise<ResponseSparePartDto> {
    return await this.sparePartRepository.remove(searchParam);
  }
}
