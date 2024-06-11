import { CreateSparePartDto } from '../domain/dto/create_spare_part.dto';
import { QuerySparePartDto } from '../domain/dto/query_spare_part.dto';
import { ResponseSparePartDto } from '../domain/dto/response_spare_part.dto';
import { UpdateSparePartDto } from '../domain/dto/update_spare_part.dto';

export interface ISparePartService {
  create(createSparePartDto: CreateSparePartDto): Promise<ResponseSparePartDto>;
  findAll(query: QuerySparePartDto): Promise<ResponseSparePartDto[]>;
  findOne(searchParam: string): Promise<ResponseSparePartDto>;
  remove(searchParam: string): Promise<ResponseSparePartDto>;
  update(
    searchParam: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<ResponseSparePartDto>;
}
