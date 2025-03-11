import { CreateSparePartDto } from '../../application/dto/create_spare_part.dto';
import { GetAllResponseSparePartDto } from '../../application/dto/get_all_response_spare_part.dto';
import { QuerySparePartDto } from '../../application/dto/query_spare_part.dto';
import { ResponseSparePartDto } from '../../application/dto/response_spare_part.dto';
import { UpdateSparePartDto } from '../../application/dto/update_spare_part.dto';

export interface ISparePartService {
  create(createSparePartDto: CreateSparePartDto): Promise<ResponseSparePartDto>;
  findAll(queryDto: QuerySparePartDto): Promise<GetAllResponseSparePartDto>;
  findOne(id: string): Promise<ResponseSparePartDto>;
  update(
    id: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<ResponseSparePartDto>;
  remove(id: string): Promise<ResponseSparePartDto>;
}
