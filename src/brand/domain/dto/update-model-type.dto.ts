import { PartialType } from '@nestjs/mapped-types';
import { CreateModelTypeDto } from './create-model-type.dto';

export class UpdateModelTypeDto extends PartialType(CreateModelTypeDto) {}
