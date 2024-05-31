import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSparePartDto } from '../domain/dto/create_spare_part.dto';
import { UpdateSparePartDto } from '../domain/dto/update_spare_part.dto';
import { SparePart } from '../domain/entities/spare_part.entity';
import { ISparePartService } from './spare_part.service.interface';
import { SparePartRepository } from '../domain/repository/spare_part_db';
import { ISparePartRepository } from '../domain/repository/spare_part_db.interface';
import { ResponseSparePartDto } from '../domain/dto/response_spare_part.dto';

@Injectable()
export class SparePartService implements ISparePartService {
  constructor(
    @Inject(SparePartRepository)
    private readonly sparePartRepository: ISparePartRepository,
  ) {}

  async create(
    createSparePartDto: CreateSparePartDto,
  ): Promise<ResponseSparePartDto | undefined> {
    try {
      const sparePart =
        await this.sparePartRepository.create(createSparePartDto);

      return this.mapSparePartToResponse(sparePart);
    } catch (error) {
      this._handleException(error);
    }
  }

  async findAll(): Promise<ResponseSparePartDto[]> {
    const response = await this.sparePartRepository.findAll();

    return response.map((sparePart) => this.mapSparePartToResponse(sparePart));
  }

  async findOne(searchParam: string): Promise<ResponseSparePartDto> {
    try {
      const sparePart = await this.sparePartRepository.findOne(searchParam);
      if (!sparePart) {
        throw new NotFoundException(
          `SparePart with id ${searchParam} not found`,
        );
      }

      return this.mapSparePartToResponse(sparePart);
    } catch (error) {
      throw new NotFoundException(`SparePart with id ${searchParam} not found`);
    }
  }

  async update(
    searchParam: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<ResponseSparePartDto | undefined> {
    try {
      const sparePart = await this.sparePartRepository.update(
        searchParam,
        updateSparePartDto,
      );
      if (!sparePart) {
        throw new NotFoundException(
          `SparePart with id ${searchParam} not found`,
        );
      }

      return this.mapSparePartToResponse(sparePart);
    } catch (error) {
      this._handleException(error);
    }
  }

  async remove(searchParam: string): Promise<ResponseSparePartDto | undefined> {
    try {
      const deleted_item = await this.sparePartRepository.remove(searchParam);

      if (!deleted_item) {
        throw new NotFoundException(
          `SparePart with id ${searchParam} not found`,
        );
      }

      return this.mapSparePartToResponse(deleted_item);
    } catch (error) {
      this._handleException(error);
    }
  }

  private mapSparePartToResponse(
    sparePart: SparePart | undefined,
  ): ResponseSparePartDto {
    return {
      _id: sparePart!._id,
      name: sparePart!.name,
      description: sparePart!.description,
      price: sparePart!.price,
      images: sparePart!.images,
      category: sparePart!.category,
      stock: sparePart!.stock,
    };
  }

  private _handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `SparePart already exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.error('Error create:', error);
    throw error;
  }
}
