import { CreateBrandDto } from '../../application/dto/create-brand.dto';
import { ResponseBrandDto } from '../../application/dto/response-brand.dto';
import { UpdateBrandDto } from '../../application/dto/update-brand.dto';

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
