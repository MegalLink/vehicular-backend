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
    const sparePart = await this.sparePartRepository.create(createSparePartDto);

    return this.mapSparePartToResponse(sparePart!);
  }

  async findAll(): Promise<ResponseSparePartDto[]> {
    const response = await this.sparePartRepository.findAll();

    return response.map((sparePart) => this.mapSparePartToResponse(sparePart));
  }

  async findOne(searchParam: string): Promise<ResponseSparePartDto> {
    const sparePart = await this.sparePartRepository.findOne(searchParam);

    return this.mapSparePartToResponse(
      this._sparePartValidateFound(sparePart, searchParam),
    );
  }

  async update(
    searchParam: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<ResponseSparePartDto | undefined> {
    const sparePart = await this.sparePartRepository.update(
      searchParam,
      updateSparePartDto,
    );

    return this.mapSparePartToResponse(
      this._sparePartValidateFound(sparePart, searchParam),
    );
  }

  async remove(searchParam: string): Promise<ResponseSparePartDto | undefined> {
    const deleted_item = await this.sparePartRepository.remove(searchParam);

    return this.mapSparePartToResponse(
      this._sparePartValidateFound(deleted_item, searchParam),
    );
  }

  private mapSparePartToResponse(sparePart: SparePart): ResponseSparePartDto {
    return {
      _id: sparePart._id,
      code: sparePart.code,
      name: sparePart.name,
      description: sparePart.description,
      price: sparePart.price,
      images: sparePart.images,
      category: sparePart.category,
      stock: sparePart.stock,
      brand: sparePart.brand,
      part_model: sparePart.part_model,
      year: sparePart.year,
    };
  }

  private _sparePartValidateFound(
    sparePart: SparePart | undefined,
    searchParam: string,
  ): SparePart {
    if (!sparePart) {
      throw new NotFoundException(
        `SparePart with id: ${searchParam} not found`,
      );
    }

    return sparePart;
  }
}
