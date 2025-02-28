import { PartialType } from '@nestjs/swagger';
import { CreateSparePartDto } from './create_spare_part.dto';

export class UpdateSparePartDto extends PartialType(CreateSparePartDto) {}
