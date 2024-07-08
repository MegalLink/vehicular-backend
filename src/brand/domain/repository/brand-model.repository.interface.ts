import { CreateBrandDto } from '../dto/create-brand.dto';

import { UpdateBrandDto } from '../dto/update-brand.dto';
import { ResponseBrandModelDto } from '../dto/response-brand-model.dto';

export interface IBrandModelRepository {
  create(createBrandDto: CreateBrandDto): Promise<ResponseBrandModelDto>;
  findAll(query?: object): Promise<ResponseBrandModelDto[]>;
  findOne(searchParam: object): Promise<ResponseBrandModelDto | undefined>;
  remove(searchParam: string): Promise<ResponseBrandModelDto>;
  update(
    searchParam: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<ResponseBrandModelDto>;
}
