import { CreateBrandDto } from '../dto/create-brand.dto';
import { ResponseBrandDto } from '../dto/response-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

export interface IBrandRepository {
  create(createBrandDto: CreateBrandDto): Promise<ResponseBrandDto>;
  findAll(): Promise<ResponseBrandDto[]>;
  findOne(searchParam: object): Promise<ResponseBrandDto | undefined>;
  remove(searchParam: string): Promise<ResponseBrandDto>;
  update(
    searchParam: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<ResponseBrandDto>;
}
