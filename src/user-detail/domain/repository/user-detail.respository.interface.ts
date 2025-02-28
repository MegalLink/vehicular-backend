import { ICreateUserDetail } from '../interfaces/create-user-detail.interface';
import { IUpdateUserDetail } from '../interfaces/update-user-detail.interface';
import { IUserDetail } from '../interfaces/user-detail.interface';

export interface IUserDetailRepository {
  create(createUserDetail: ICreateUserDetail): Promise<IUserDetail>;
  findAll(filter?: any): Promise<IUserDetail[]>;
  findOne(searchParam: object): Promise<IUserDetail | undefined>;
  remove(searchParam: string): Promise<IUserDetail>;
  update(
    searchParam: string,
    updateUserDetail: IUpdateUserDetail,
  ): Promise<IUserDetail>;
}
