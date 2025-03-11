import { PartialType } from '@nestjs/swagger';
import { CreateBrandModelDto } from './create-brand-model.dto';

export class UpdateBrandModelDto extends PartialType(CreateBrandModelDto) {}
