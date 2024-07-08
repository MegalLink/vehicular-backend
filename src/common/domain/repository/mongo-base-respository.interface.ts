import { Document } from 'mongoose';

export interface IBaseRepository<T extends Document, R> {
  create(createDto: any): Promise<R>;
  findAll(query?: object): Promise<R[]>;
  findOne(searchParam: object): Promise<R | undefined>;
  update(searchParam: string, updateDto: any): Promise<R>;
  remove(searchParam: string): Promise<R>;
  transform(entity: T): R;
}
