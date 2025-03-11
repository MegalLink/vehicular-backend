import { PartialType } from '@nestjs/mapped-types';

import { ResponseUserDbDto } from './response-user-db.dto';

export class UpdateUserDbDto extends PartialType(ResponseUserDbDto) {}
