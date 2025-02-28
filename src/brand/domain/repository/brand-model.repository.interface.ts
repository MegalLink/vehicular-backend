import { ResponseBrandModelDto } from '../../application/dto/response-brand-model.dto';
import { CreateBrandModelDto } from '../../application/dto/create-brand-model.dto';
import { UpdateBrandModelDto } from '../../application/dto/update-brand-model.dto';

export interface IBrandModelRepository {
  create(createBrandDto: CreateBrandModelDto): Promise<ResponseBrandModelDto>;
  findAll(query?: object): Promise<ResponseBrandModelDto[]>;
  findOne(searchParam: object): Promise<ResponseBrandModelDto | undefined>;
  remove(searchParam: string): Promise<ResponseBrandModelDto>;
  update(
    searchParam: string,
    updateBrandDto: UpdateBrandModelDto,
  ): Promise<ResponseBrandModelDto>;
}
