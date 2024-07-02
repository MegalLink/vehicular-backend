import { ResponseModelTypeDto } from '../dto/response-model-type.dto';
import { CreateModelTypeDto } from '../dto/create-model-type.dto';
import { UpdateModelTypeDto } from '../dto/update-model-type.dto';

export interface IModelTypeRepository {
  create(createDTO: CreateModelTypeDto): Promise<ResponseModelTypeDto>;
  findAll(query?: object): Promise<ResponseModelTypeDto[]>;
  findOne(searchParam: object): Promise<ResponseModelTypeDto>;
  remove(searchParam: string): Promise<ResponseModelTypeDto>;
  update(
    searchParam: string,
    updateDto: UpdateModelTypeDto,
  ): Promise<ResponseModelTypeDto>;
}
