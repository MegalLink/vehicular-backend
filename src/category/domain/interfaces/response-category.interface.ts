import { ICategory } from './category.interface';

/**
 * Interface that defines the structure for Category responses
 */
export interface IResponseCategory extends ICategory {
  _id: string;
}
