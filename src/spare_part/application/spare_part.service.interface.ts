import { CreateSparePartDto } from '../domain/dto/create_spare_part.dto';
import { ResponseSparePartDto } from '../domain/dto/response_spare_part.dto';
import { UpdateSparePartDto } from '../domain/dto/update_spare_part.dto';

export interface ISparePartService {
  create(
    createSparePartDto: CreateSparePartDto,
  ): Promise<ResponseSparePartDto | undefined>;
  findAll(): Promise<ResponseSparePartDto[]>;
  findOne(searchParam: string): Promise<ResponseSparePartDto>;
  remove(searchParam: string): Promise<ResponseSparePartDto | undefined>;
  update(
    searchParam: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<ResponseSparePartDto | undefined>;
}
