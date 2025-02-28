export interface IBaseRepository<T, R> {
  transform(entity: T): R;
  create(createDto: any): Promise<R>;
  findAll(query?: object, offset?: number, limit?: number): Promise<R[]>;
  count(query?: object): Promise<number>;
  findOne(searchParam: object): Promise<R | undefined>;
  update(searchParam: string, updateDto: any): Promise<R>;
  remove(searchParam: string): Promise<R>;
}
