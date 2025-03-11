import { ISparePart } from './spare-part.interface';

export interface IResponseSparePart extends ISparePart {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
