import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSparePartDto } from './dto/create_spare_part.dto';
import { UpdateSparePartDto } from './dto/update_spare_part.dto';
import { ISparePartService } from '../domain/ports/spare_part.service.interface';
import { ISparePartRepository } from '../domain/repository/spare_part.repository.interface';
import { ResponseSparePartDto } from './dto/response_spare_part.dto';
import { GetAllResponseSparePartDto } from './dto/get_all_response_spare_part.dto';
import { isValidObjectId } from 'mongoose';
import { QuerySparePartDto } from './dto/query_spare_part.dto';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from 'src/config/env.config';

@Injectable()
export class SparePartService implements ISparePartService {
  constructor(
    @Inject('ISparePartRepository')
    private readonly sparePartRepository: ISparePartRepository,
    private readonly configService: ConfigService,
  ) {}

  async create(
    createSparePartDto: CreateSparePartDto,
  ): Promise<ResponseSparePartDto> {
    return await this.sparePartRepository.create(createSparePartDto);
  }

  async findAll(
    queryDto: QuerySparePartDto,
  ): Promise<GetAllResponseSparePartDto> {
    const query = this.buildQuery(queryDto);
    const { offset = 0, limit = 0 } = queryDto;

    const [total, results] = await Promise.all([
      this.sparePartRepository.count(query),
      this.sparePartRepository.findAll(query, offset, limit),
    ]);

    const baseUrl = this.configService.get<string>(
      EnvironmentConstants.rest_api_url,
    );
    const hasNext = offset + limit < total;
    const hasPrevious = offset > 0;

    const next = hasNext
      ? `${baseUrl}/api/v1/spare-part?offset=${offset + limit}&limit=${limit}`
      : null;
    const previous = hasPrevious
      ? `${baseUrl}/api/v1/spare-part?offset=${Math.max(0, offset - limit)}&limit=${limit}`
      : null;

    return {
      count: total,
      next,
      previous,
      results,
    };
  }

  private buildQuery(filters: QuerySparePartDto): Record<string, any> {
    const query: Record<string, any> = {};

    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.minStock !== undefined) {
      query.stock = { ...query.stock, $gte: filters.minStock };
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
      throw new NotFoundException(
        `Repuesto con ${JSON.stringify(query)} no encontrado`,
      );
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
