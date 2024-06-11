import { CreateSparePartDto } from '../dto/create_spare_part.dto';
import { ResponseSparePartDto } from '../dto/response_spare_part.dto';
import { UpdateSparePartDto } from '../dto/update_spare_part.dto';

export interface ISparePartRepository {
  create(createSparePartDto: CreateSparePartDto): Promise<ResponseSparePartDto>;
  findAll(filter: any): Promise<ResponseSparePartDto[]>;
  findOne(searchParam: object): Promise<ResponseSparePartDto>;
  remove(searchParam: string): Promise<ResponseSparePartDto>;
  update(
    searchParam: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<ResponseSparePartDto>;
}
