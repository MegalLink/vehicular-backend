import { CreateBrandDto } from '../domain/dto/create-brand.dto';
import { ResponseBrandDto } from '../domain/dto/response-brand.dto';
import { UpdateBrandDto } from '../domain/dto/update-brand.dto';

export interface IBrandService {
  create(createBrandDto: CreateBrandDto): Promise<ResponseBrandDto>;
  findAll(): Promise<ResponseBrandDto[]>;
  findOne(searchParam: string): Promise<ResponseBrandDto>;
  remove(searchParam: string): Promise<ResponseBrandDto>;
  update(
    searchParam: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<ResponseBrandDto>;
}
