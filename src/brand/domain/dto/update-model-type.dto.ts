import { PartialType } from '@nestjs/swagger';
import { CreateModelTypeDto } from './create-model-type.dto';

export class UpdateModelTypeDto extends PartialType(CreateModelTypeDto) {}
