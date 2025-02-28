import { ICreateCategory } from '../interfaces/create-category.interface';
import { IResponseCategory } from '../interfaces/response-category.interface';
import { IUpdateCategory } from '../interfaces/update-category.interface';

export interface ICategoryService {
  create(createCategory: ICreateCategory): Promise<IResponseCategory>;
  findAll(): Promise<IResponseCategory[]>;
  findOne(searchParam: string): Promise<IResponseCategory>;
  remove(searchParam: string): Promise<IResponseCategory>;
  update(
    searchParam: string,
    updateCategory: IUpdateCategory,
  ): Promise<IResponseCategory>;
}
