import { CreateUserDetailDto } from '../dto/create-user-detail.dto';
import { ResponseUserDetailDbDto } from '../dto/response-user-detail-response-db.dto';
import { UpdateUserDetailDto } from '../dto/update-user-detail.dto';

export interface IUserDetailRepository {
  create(createDto: CreateUserDetailDto): Promise<ResponseUserDetailDbDto>;
  findAll(filter?: any): Promise<ResponseUserDetailDbDto[]>;
  findOne(searchParam: object): Promise<ResponseUserDetailDbDto | undefined>;
  remove(searchParam: string): Promise<ResponseUserDetailDbDto>;
  update(
    searchParam: string,
    updateSparePartDto: UpdateUserDetailDto,
  ): Promise<ResponseUserDetailDbDto>;
}
