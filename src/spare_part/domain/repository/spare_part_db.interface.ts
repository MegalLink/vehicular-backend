import { CreateSparePartDto } from '../dto/create_spare_part.dto';
import { UpdateSparePartDto } from '../dto/update_spare_part.dto';
import { SparePart } from '../entities/spare_part.entity';

export interface ISparePartRepository {
  create(
    createSparePartDto: CreateSparePartDto,
  ): Promise<SparePart | undefined>;
  findAll(): Promise<SparePart[]>;
  findOne(searchParam: string): Promise<SparePart>;
  remove(searchParam: string): Promise<SparePart | undefined>;
  update(
    searchParam: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<SparePart | undefined>;
}
