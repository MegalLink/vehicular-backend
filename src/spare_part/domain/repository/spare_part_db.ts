import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSparePartDto } from '../dto/create_spare_part.dto';
import { UpdateSparePartDto } from '../dto/update_spare_part.dto';
import { Model } from 'mongoose';
import { SparePart } from '../entities/spare_part.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ISparePartRepository } from './spare_part_db.interface';

@Injectable()
export class SparePartRepository implements ISparePartRepository {
  constructor(
    @InjectModel(SparePart.name)
    private readonly _sparePartModel: Model<SparePart>,
  ) {}

  async create(
    createSparePartDto: CreateSparePartDto,
  ): Promise<SparePart | undefined> {
    try {
      const sparePart = await this._sparePartModel.create(createSparePartDto);

      return sparePart;
    } catch (error) {
      this._handleException(error);
    }
  }

  async findAll(): Promise<SparePart[]> {
    const response = await this._sparePartModel.find();

    return response;
  }

  async findOne(searchParam: string): Promise<SparePart> {
    try {
      const sparePart = await this._sparePartModel.findById(searchParam);
      if (!sparePart) {
        throw new NotFoundException(
          `Spare Part with id ${searchParam} not found`,
        );
      }

      return sparePart;
    } catch (error) {
      throw new NotFoundException(
        `Spare Part with id ${searchParam} not found`,
      );
    }
  }

  async update(
    searchParam: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<SparePart | undefined> {
    try {
      const sparePart = await this._sparePartModel.findByIdAndUpdate(
        searchParam,
        updateSparePartDto,
        { new: true },
      );
      if (!sparePart) {
        throw new NotFoundException(
          `Spare Part with id ${searchParam} not found`,
        );
      }

      return sparePart;
    } catch (error) {
      this._handleException(error);
    }
  }

  async remove(searchParam: string): Promise<SparePart | undefined> {
    const search_key = { _id: searchParam };

    try {
      const deleted_item =
        await this._sparePartModel.findByIdAndDelete(search_key);

      if (!deleted_item) {
        throw new NotFoundException(
          `Spare Part with id ${searchParam} not found`,
        );
      }

      return deleted_item;
    } catch (error) {
      this._handleException(error);
    }
  }

  private _handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Spare Part already exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.error('Error create:', error);
    throw error;
  }
}
