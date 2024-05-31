import { PartialType } from '@nestjs/mapped-types';
import { CreateSparePartDto } from './create_spare_part.dto';

export class UpdateSparePartDto extends PartialType(CreateSparePartDto) {}
