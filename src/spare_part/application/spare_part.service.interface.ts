import { CreateSparePartDto } from '../domain/dto/create_spare_part.dto';
import { GetAllResponseSparePartDto } from '../domain/dto/get_all_response_spare_part.dto';
import { QuerySparePartDto } from '../domain/dto/query_spare_part.dto';
import { ResponseSparePartDto } from '../domain/dto/response_spare_part.dto';
import { UpdateSparePartDto } from '../domain/dto/update_spare_part.dto';
import { ResponseUserDbDto } from 'src/auth/domain/dto/response-user-db.dto';

export interface ISparePartService {
  create(
    createSparePartDto: CreateSparePartDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseSparePartDto>;
  findAll(queryDto: QuerySparePartDto): Promise<GetAllResponseSparePartDto>;
  findOne(id: string): Promise<ResponseSparePartDto>;
  update(
    id: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<ResponseSparePartDto>;
  remove(id: string): Promise<ResponseSparePartDto>;
}
