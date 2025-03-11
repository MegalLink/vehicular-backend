import { ResponseUserDbDto } from 'src/auth/application/dto/response-user-db.dto';
import { CreateUserDetailDto } from 'src/user-detail/application/dto/create-user-detail.dto';
import { QueryUserDetailDto } from 'src/user-detail/application/dto/query-user-detail.dto';
import { ResponseUserDetailDbDto } from 'src/user-detail/application/dto/response-user-detail-response-db.dto';
import { UpdateUserDetailDto } from 'src/user-detail/application/dto/update-user-detail.dto';

export interface IUserDetailService {
  create(
    createDto: CreateUserDetailDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto>;
  findAll(
    query: QueryUserDetailDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto[]>;
  findOne(
    searchParam: string,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto>;
  update(
    searchParam: string,
    updateCategoryDto: UpdateUserDetailDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto>;
  remove(
    searchParam: string,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto>;
}
