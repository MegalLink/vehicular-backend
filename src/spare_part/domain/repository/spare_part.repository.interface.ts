import { ICreateSparePart } from '../interfaces/create-spare-part.interface';
import { IResponseSparePart } from '../interfaces/response-spare-part.interface';
import { IUpdateSparePart } from '../interfaces/update-spare-part.interface';

export interface ISparePartRepository {
  create(createSparePart: ICreateSparePart): Promise<IResponseSparePart>;
  findAll(
    filter?: any,
    offset?: number,
    limit?: number,
  ): Promise<IResponseSparePart[]>;
  count(filter?: any): Promise<number>;
  findOne(searchParam: object): Promise<IResponseSparePart | undefined>;
  remove(searchParam: string): Promise<IResponseSparePart>;
  update(
    searchParam: string,
    updateSparePart: IUpdateSparePart,
  ): Promise<IResponseSparePart>;
}
