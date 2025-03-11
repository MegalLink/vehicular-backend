import { SignUpUserDto } from '../../application/dto/sign-up.dto';
import { ResponseUserDbDto } from '../../application/dto/response-user-db.dto';
import { UpdateUserDbDto } from '../../application/dto/update-user-db.dto';

export interface IUserRepository {
  create(createUserDto: SignUpUserDto | object): Promise<ResponseUserDbDto>;
  findOne(searchParam: object): Promise<ResponseUserDbDto | undefined>;
  findAll(filter?: any): Promise<ResponseUserDbDto[]>;
  update(
    searchParam: string,
    updateCategoryDto: UpdateUserDbDto,
  ): Promise<ResponseUserDbDto>;
}
