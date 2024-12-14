import { CreateSparePartDto } from '../dto/create_spare_part.dto';
import { ResponseSparePartDto } from '../dto/response_spare_part.dto';
import { UpdateSparePartDto } from '../dto/update_spare_part.dto';

export interface ISparePartRepository {
  create(createSparePartDto: CreateSparePartDto): Promise<ResponseSparePartDto>;
  findAll(filter?: any, offset?: number, limit?: number): Promise<ResponseSparePartDto[]>;
  count(filter?: any): Promise<number>;
  findOne(searchParam: object): Promise<ResponseSparePartDto | undefined>;
  remove(searchParam: string): Promise<ResponseSparePartDto>;
  update(
    searchParam: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<ResponseSparePartDto>;
}
