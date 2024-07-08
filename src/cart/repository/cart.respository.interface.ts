import { CreateCartDto } from '../dto/create-cart.dto';
import { ResponseCartDbDto } from '../dto/response-cart-db.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';

export interface ICartRepository {
  create(createDto: CreateCartDto): Promise<ResponseCartDbDto>;
  findAll(filter?: any): Promise<ResponseCartDbDto[]>;
  findOne(searchParam: object): Promise<ResponseCartDbDto | undefined>;
  remove(searchParam: string): Promise<ResponseCartDbDto>;
  update(
    searchParam: string,
    updateSparePartDto: UpdateCartDto,
  ): Promise<ResponseCartDbDto>;
}
